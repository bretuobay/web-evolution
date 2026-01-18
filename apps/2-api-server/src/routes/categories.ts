import { Router } from "express";
import type { NextFunction, Request, Response } from "express";
import {
  createCategory,
  deleteCategory,
  getCategoryById,
  listCategories,
  listProducts,
  updateCategory,
} from "@wees/database";
import { database } from "../db";
import { ApiError } from "../middleware/errorHandler";
import { schemaUtils, validateBody } from "../middleware/validation";

const router = Router();

const createCategorySchema = {
  name: schemaUtils.requiredString("name"),
  description: schemaUtils.optionalString("description"),
  parentId: schemaUtils.optionalNumber("parentId"),
};

const updateCategorySchema = {
  name: schemaUtils.optionalString("name"),
  description: schemaUtils.optionalString("description"),
  parentId: schemaUtils.optionalNumber("parentId"),
};

router.get("/", (_req, res) => {
  const categories = listCategories(database);
  res.json(categories);
});

router.get("/:id", (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const category = getCategoryById(database, id);
    if (!category) {
      throw new ApiError(404, "Category not found");
    }
    const { data } = listProducts(database, { categoryId: id });
    res.json({ ...category, products: data });
  } catch (error) {
    next(error);
  }
});

router.post("/", validateBody(createCategorySchema), (req, res, next) => {
  try {
    const payload = {
      name: req.body.name,
      description: req.body.description ?? "",
      parentId:
        req.body.parentId === undefined ? null : Number(req.body.parentId),
    };
    const created = createCategory(database, payload);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", validateBody(updateCategorySchema), (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const payload: Record<string, unknown> = {};
    if (req.body.name !== undefined) payload.name = req.body.name;
    if (req.body.description !== undefined)
      payload.description = req.body.description;
    if (req.body.parentId !== undefined)
      payload.parentId =
        req.body.parentId === null ? null : Number(req.body.parentId);
    const updated = updateCategory(database, id, payload as never);
    if (!updated) {
      throw new ApiError(404, "Category not found");
    }
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const deleted = deleteCategory(database, id);
    if (!deleted) {
      throw new ApiError(404, "Category not found");
    }
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

export default router;
