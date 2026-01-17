// This file defines the routes for product-related pages.
// In the MVC pattern, the router's job is to listen for requests and delegate them to the appropriate controller.
import express from 'express';
import {
  getAllProducts,
  getNewProductForm,
  createProduct,
  getProductById,
  getEditProductForm,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';

// We'll create a router object to define a set of related routes.
const router = express.Router();

// --- Product Routes ---

// GET /products - Display a list of all products.
router.get('/', getAllProducts);

// GET /products/new - Display a form to create a new product.
router.get('/new', getNewProductForm);

// POST /products - Handle the submission of the new product form.
router.post('/', createProduct);

// GET /products/:id - Display a single product's details.
router.get('/:id', getProductById);

// GET /products/:id/edit - Display a form to edit an existing product.
router.get('/:id/edit', getEditProductForm);

// POST /products/:id - Handle the submission of the edit product form.
router.post('/:id', updateProduct);

// POST /products/:id/delete - Handle the deletion of a product.
router.post('/:id/delete', deleteProduct);

// This makes the router object available to be used in other parts of the application (like our main index.ts).
export default router;
