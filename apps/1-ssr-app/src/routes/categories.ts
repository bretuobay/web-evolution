// This file defines the routes for category-related pages.
// Similar to the product routes, this router delegates requests to controller actions.
import express from 'express';
import {
  getAllCategories,
  getCategoryById,
} from '../controllers/categoryController';

const router = express.Router();

// --- Category Routes ---

// GET /categories - Display a list of all categories.
router.get('/', getAllCategories);

// GET /categories/:id - Display all products within a single category.
router.get('/:id', getCategoryById);

export default router;
