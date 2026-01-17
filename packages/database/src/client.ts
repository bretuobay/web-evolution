import Database from "better-sqlite3";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { Category, PaginatedResponse, Product } from "@wees/shared-types";

const packageRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const schemaSQL = readFileSync(join(packageRoot, "src", "schema.sql"), "utf8");
const seedSQL = readFileSync(join(packageRoot, "src", "seed.sql"), "utf8");

export interface ProductInput extends Omit<Product, "id" | "createdAt" | "updatedAt"> {}
export interface CategoryInput extends Omit<Category, "id"> {}

const PRODUCT_COLUMN_MAP: Record<keyof ProductInput, string> = {
  name: "name",
  description: "description",
  price: "price",
  quantity: "quantity",
  categoryId: "category_id"
};

const CATEGORY_COLUMN_MAP: Record<keyof CategoryInput, string> = {
  name: "name",
  parentId: "parent_id",
  description: "description"
};

export interface ProductQueryOptions {
  page?: number;
  pageSize?: number;
  search?: string;
  categoryId?: number;
}

export type DatabaseClient = InstanceType<typeof Database>;

export function initializeDatabase(dbPath = ":memory:"): DatabaseClient {
  const db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  db.exec(schemaSQL);
  db.exec(seedSQL);
  return db;
}

export function normalizePagination(options?: ProductQueryOptions) {
  const page = Math.max(1, options?.page ?? 1);
  const pageSize = Math.min(100, Math.max(1, options?.pageSize ?? 10));
  return { page, pageSize };
}

function mapProductKey(key: keyof ProductInput) {
  return PRODUCT_COLUMN_MAP[key];
}

function mapCategoryKey(key: keyof CategoryInput) {
  return CATEGORY_COLUMN_MAP[key];
}

function buildWhereClause(filters: ProductQueryOptions) {
  const clauses: string[] = [];
  if (filters.categoryId) {
    clauses.push("category_id = @categoryId");
  }
  if (filters.search) {
    clauses.push("(name LIKE @search OR description LIKE @search)");
  }
  return clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
}

export function listProducts(db: DatabaseClient, filters?: ProductQueryOptions): PaginatedResponse<Product> {
  const { page, pageSize } = normalizePagination(filters);
  const whereFilters = filters ?? {};
  const whereClause = buildWhereClause(whereFilters);
  const bindings: Record<string, unknown> = {};
  if (whereFilters.categoryId) {
    bindings.categoryId = whereFilters.categoryId;
  }
  if (whereFilters.search) {
    bindings.search = `%${whereFilters.search}%`;
  }

  const totalRow = db
    .prepare(`SELECT COUNT(1) AS total FROM products ${whereClause}`)
    .get(bindings) as { total: number };
  const total = totalRow?.total ?? 0;
  const offset = (page - 1) * pageSize;
  const data = db
    .prepare(`SELECT * FROM products ${whereClause} ORDER BY created_at DESC LIMIT @limit OFFSET @offset`)
    .all({ ...bindings, limit: pageSize, offset }) as Product[];
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return {
    data,
    total,
    page,
    pageSize,
    totalPages
  };
}

export function getProductById(db: DatabaseClient, id: number): Product | null {
  return (db.prepare("SELECT * FROM products WHERE id = ?").get(id) as Product) ?? null;
}

export function createProduct(db: DatabaseClient, payload: ProductInput): Product {
  const stmt = db.prepare(
    "INSERT INTO products (name, description, price, quantity, category_id) VALUES (@name, @description, @price, @quantity, @categoryId)"
  );
  const info = stmt.run(payload as Parameters<typeof stmt.run>[0]);
  const result = getProductById(db, Number(info.lastInsertRowid));
  if (!result) {
    throw new Error("Failed to retrieve the newly created product");
  }
  return result;
}

export function updateProduct(db: DatabaseClient, id: number, payload: Partial<ProductInput>): Product | null {
  const entries = Object.entries(payload) as Array<[keyof ProductInput, unknown]>;
  if (!entries.length) {
    return getProductById(db, id);
  }
  const assignments = entries.map(([key]) => `${mapProductKey(key)} = @${String(key)}`);
  const stmt = db.prepare(
    `UPDATE products SET ${assignments.join(", ")}, updated_at = CURRENT_TIMESTAMP WHERE id = @id`
  );
  stmt.run({ ...payload, id });
  return getProductById(db, id);
}

export function deleteProduct(db: DatabaseClient, id: number): boolean {
  const result = db.prepare("DELETE FROM products WHERE id = ?").run(id);
  return result.changes > 0;
}

export function listCategories(db: DatabaseClient): Category[] {
  return db.prepare("SELECT * FROM categories ORDER BY name").all() as Category[];
}

export function getCategoryById(db: DatabaseClient, id: number): Category | null {
  return (db.prepare("SELECT * FROM categories WHERE id = ?").get(id) as Category) ?? null;
}

export function createCategory(db: DatabaseClient, payload: CategoryInput): Category {
  const stmt = db.prepare("INSERT INTO categories (name, description, parent_id) VALUES (@name, @description, @parentId)");
  const info = stmt.run(payload as Parameters<typeof stmt.run>[0]);
  const result = getCategoryById(db, Number(info.lastInsertRowid));
  if (!result) throw new Error("Failed to retrieve the newly created category");
  return result;
}

export function updateCategory(db: DatabaseClient, id: number, payload: Partial<CategoryInput>): Category | null {
  const entries = Object.entries(payload) as Array<[keyof CategoryInput, unknown]>;
  if (!entries.length) {
    return getCategoryById(db, id);
  }
  const assignments = entries.map(([key]) => `${mapCategoryKey(key)} = @${String(key)}`);
  const stmt = db.prepare(`UPDATE categories SET ${assignments.join(", ")} WHERE id = @id`);
  stmt.run({ ...payload, id });
  return getCategoryById(db, id);
}

export function deleteCategory(db: DatabaseClient, id: number): boolean {
  const result = db.prepare("DELETE FROM categories WHERE id = ?").run(id);
  return result.changes > 0;
}

export function searchProducts(db: DatabaseClient, query: string, limit = 10): Product[] {
  const term = `%${query}%`;
  return (
    db
      .prepare("SELECT * FROM products WHERE name LIKE @term OR description LIKE @term ORDER BY created_at DESC LIMIT @limit")
      .all({ term, limit }) as Product[]
  ).filter(Boolean);
}
