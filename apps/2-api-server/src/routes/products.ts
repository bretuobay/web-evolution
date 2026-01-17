import { Router } from "express";
import type { NextFunction, Request, Response } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProduct
} from "@wees/database";
import { database } from "../db";
import { ApiError } from "../middleware/errorHandler";
import { schemaUtils, validateBody } from "../middleware/validation";
import type { ProductQueryOptions } from "@wees/database";

const router = Router();

const createProductSchema = {
  name: schemaUtils.requiredString("name"),
  description: schemaUtils.optionalString("description"),
  price: schemaUtils.requiredNumber("price"),
  quantity: schemaUtils.requiredNumber("quantity"),
  categoryId: schemaUtils.requiredNumber("categoryId")
};

const updateProductSchema = {
  name: schemaUtils.optionalString("name"),
  description: schemaUtils.optionalString("description"),
  price: schemaUtils.optionalNumber("price"),
  quantity: schemaUtils.optionalNumber("quantity"),
  categoryId: schemaUtils.optionalNumber("categoryId")
};

router.get(
  "/",
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const filters: ProductQueryOptions = {
        page: req.query.page ? Number(req.query.page) : undefined,
        pageSize: req.query.pageSize ? Number(req.query.pageSize) : undefined,
        search: typeof req.query.search === "string" ? req.query.search : undefined,
        categoryId: req.query.categoryId ? Number(req.query.categoryId) : undefined
      };
      const data = listProducts(database, filters);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/:id", (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const product = getProductById(database, id);
    if (!product) {
      throw new ApiError(404, "Product not found");
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.post("/", validateBody(createProductSchema), (req, res, next) => {
  try {
    const payload = {
      name: req.body.name,
      description: req.body.description ?? "",
      price: Number(req.body.price),
      quantity: Number(req.body.quantity),
      categoryId: Number(req.body.categoryId)
    };
    const product = createProduct(database, payload);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", validateBody(updateProductSchema), (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const payload: Record<string, unknown> = {};
    if (req.body.name !== undefined) payload.name = req.body.name;
    if (req.body.description !== undefined) payload.description = req.body.description;
    if (req.body.price !== undefined) payload.price = Number(req.body.price);
    if (req.body.quantity !== undefined) payload.quantity = Number(req.body.quantity);
    if (req.body.categoryId !== undefined) payload.categoryId = Number(req.body.categoryId);
    const updated = updateProduct(database, id, payload as never);
    if (!updated) {
      throw new ApiError(404, "Product not found");
    }
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const deleted = deleteProduct(database, id);
    if (!deleted) {
      throw new ApiError(404, "Product not found");
    }
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

export default router;
