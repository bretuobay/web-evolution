// This file contains the business logic for product-related requests.
// In the MVC pattern, the Controller is responsible for handling user input,
// interacting with the Model (data layer), and deciding which View to render.
import { RequestHandler } from 'express';
import {
  listProducts,
  getProductById as getProduct,
  createProduct as dbCreateProduct,
  updateProduct as dbUpdateProduct,
  deleteProduct as dbDeleteProduct,
  listCategories,
} from '@wees/database';
import { getDb } from '../db';

// --- Product Controller Functions ---

/**
 * @description Display a list of all products with pagination.
 * @route GET /products
 */
export const getAllProducts: RequestHandler = (req, res) => {
  const db = getDb();
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = 10;

  const result = listProducts(db, { page, pageSize });
  const categories = listCategories(db);

  // Map category names to products
  const categoryMap = new Map(categories.map(c => [c.id, c.name]));
  const products = result.data.map(p => ({
    ...p,
    categoryName: categoryMap.get(p.category_id) || 'Uncategorized'
  }));

  res.render('products/index', {
    products,
    currentPage: result.page,
    totalPages: result.totalPages,
  });
};

/**
 * @description Display a form to create a new product.
 * @route GET /products/new
 */
export const getNewProductForm: RequestHandler = (req, res) => {
  const db = getDb();
  const categories = listCategories(db);

  res.render('products/new', {
    categories,
    product: {},
    errors: {},
  });
};

/**
 * @description Handle the submission of the new product form.
 * @route POST /products
 */
export const createProduct: RequestHandler = (req, res) => {
  const db = getDb();
  const { name, description, price, quantity, categoryId } = req.body;

  // Basic server-side validation
  const errors: Record<string, string> = {};
  if (!name?.trim()) errors.name = 'Name is required';
  if (!price || isNaN(parseFloat(price))) errors.price = 'Valid price is required';
  if (!quantity || isNaN(parseInt(quantity))) errors.quantity = 'Valid quantity is required';

  if (Object.keys(errors).length > 0) {
    const categories = listCategories(db);
    return res.render('products/new', {
      categories,
      product: req.body,
      errors,
    });
  }

  dbCreateProduct(db, {
    name: name.trim(),
    description: description?.trim() || '',
    price: parseFloat(price),
    quantity: parseInt(quantity),
    categoryId: parseInt(categoryId) || 1,
  });

  // @ts-ignore - Flash message
  req.session.flash = { success: 'Product created successfully!' };
  res.redirect('/products');
};

/**
 * @description Display a single product's details.
 * @route GET /products/:id
 */
export const getProductById: RequestHandler = (req, res) => {
  const db = getDb();
  const product = getProduct(db, parseInt(req.params.id));

  if (!product) {
    return res.status(404).send('Product not found');
  }

  const categories = listCategories(db);
  const category = categories.find(c => c.id === product.category_id);

  res.render('products/show', {
    product: {
      ...product,
      categoryName: category?.name || 'Uncategorized',
    },
  });
};

/**
 * @description Display a form to edit an existing product.
 * @route GET /products/:id/edit
 */
export const getEditProductForm: RequestHandler = (req, res) => {
  const db = getDb();
  const product = getProduct(db, parseInt(req.params.id));

  if (!product) {
    return res.status(404).send('Product not found');
  }

  const categories = listCategories(db);

  res.render('products/edit', {
    product,
    categories,
    errors: {},
  });
};

/**
 * @description Handle the submission of the edit product form.
 * @route POST /products/:id
 */
export const updateProduct: RequestHandler = (req, res) => {
  const db = getDb();
  const id = parseInt(req.params.id);
  const { name, description, price, quantity, categoryId } = req.body;

  // Basic server-side validation
  const errors: Record<string, string> = {};
  if (!name?.trim()) errors.name = 'Name is required';
  if (!price || isNaN(parseFloat(price))) errors.price = 'Valid price is required';
  if (!quantity || isNaN(parseInt(quantity))) errors.quantity = 'Valid quantity is required';

  if (Object.keys(errors).length > 0) {
    const categories = listCategories(db);
    return res.render('products/edit', {
      product: { id, ...req.body },
      categories,
      errors,
    });
  }

  dbUpdateProduct(db, id, {
    name: name.trim(),
    description: description?.trim() || '',
    price: parseFloat(price),
    quantity: parseInt(quantity),
    categoryId: parseInt(categoryId) || 1,
  });

  // @ts-ignore - Flash message
  req.session.flash = { success: 'Product updated successfully!' };
  res.redirect(`/products/${id}`);
};

/**
 * @description Handle the deletion of a product.
 * @route POST /products/:id/delete
 */
export const deleteProduct: RequestHandler = (req, res) => {
  const db = getDb();
  const id = parseInt(req.params.id);

  dbDeleteProduct(db, id);

  // @ts-ignore - Flash message
  req.session.flash = { success: 'Product deleted successfully!' };
  res.redirect('/products');
};
