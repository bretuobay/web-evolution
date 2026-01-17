// This file contains the business logic for category-related requests.
import { RequestHandler } from 'express';
import { listCategories, getCategoryById as getCategory, listProducts } from '@wees/database';
import { getDb } from '../db.js';

// --- Category Controller Functions ---

/**
 * @description Display a list of all categories.
 * @route GET /categories
 */
export const getAllCategories: RequestHandler = (req, res) => {
  const db = getDb();
  const categories = listCategories(db);

  res.render('categories/index', { categories });
};

/**
 * @description Display all products within a single category.
 * @route GET /categories/:id
 */
export const getCategoryById: RequestHandler = (req, res) => {
  const db = getDb();
  const category = getCategory(db, parseInt(req.params.id));

  if (!category) {
    return res.status(404).send('Category not found');
  }

  const result = listProducts(db, { categoryId: category.id });

  res.render('categories/show', {
    category,
    products: result.data,
  });
};
