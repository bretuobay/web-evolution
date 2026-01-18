// apps/6-mvvm-app/src/models/index.ts

/**
 * @file This file defines the core data models for the application.
 * In an MVVM architecture, the Model represents the application's domain data
 * and business logic. It is completely independent of the View and ViewModel.
 * Models are responsible for fetching and storing data, and can be thought of
 * as the "source of truth" for the application's state.
 */

/**
 * Represents a product category.
 * This interface defines the shape of a category object.
 */
export interface Category {
  id: number;
  name: string;
}

/**
 * Represents a product.
 * This interface defines the shape of a product object, including its
 * association with a category.
 */
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  categoryId: number;
}

/**
* A sample list of categories.
* In a real-world application, this data would likely come from an API.
*/
export const sampleCategories: Category[] = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Books' },
    { id: 3, name: 'Clothing' },
    { id: 4, name: 'Sports' },
];

/**
* A sample list of products.
* In a real-world application, this data would likely come from an API.
*/
export const sampleProducts: Product[] = [
    { id: 101, name: 'Wireless Mouse', description: 'Smooth, precise, and battery-free.', price: 29.99, quantity: 42, categoryId: 1 },
    { id: 102, name: 'Bluetooth Keyboard', description: 'Slim, compact keyboard with backlight.', price: 79.99, quantity: 18, categoryId: 1 },
    { id: 103, name: 'The Pragmatic Programmer', description: 'Industry classic about craftsmanship.', price: 42.5, quantity: 7, categoryId: 2 },
    { id: 104, name: 'Clean Code', description: 'Practical guide to writing cleaner software.', price: 35.0, quantity: 12, categoryId: 2 },
    { id: 105, name: 'Running Shoes', description: 'Lightweight trainers built for tempo runs.', price: 89.99, quantity: 30, categoryId: 3 },
    { id: 106, name: 'T-Shirt', description: 'Soft cotton tee with modern fit.', price: 19.99, quantity: 64, categoryId: 3 },
    { id: 107, name: 'Basketball', description: 'Official size and grip for pickup games.', price: 24.99, quantity: 20, categoryId: 4 },
];
