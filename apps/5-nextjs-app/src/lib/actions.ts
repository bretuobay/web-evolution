// src/lib/actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createProduct, updateProduct, deleteProduct, ProductInput } from '@wees/database';
import { db } from './db';

/**
 * Server Action: createOrUpdateProduct
 *
 * This function runs only on the server. It can be called from Client Components
 * as if it were a regular JavaScript function. The `revalidatePath` call is a
 * key part of the Next.js caching strategy: it tells Next.js to re-render the
 * specified page on the next request, ensuring the data is fresh.
 *
 * The `redirect` call is used to navigate the user to a different page after the
 * action is complete.
 */
export async function createOrUpdateProduct(formData: FormData) {
  const id = formData.get('id') ? Number(formData.get('id')) : undefined;

  const productData: ProductInput = {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    price: Number(formData.get('price')),
    quantity: Number(formData.get('quantity')),
    // In a real app, you'd have a way to select the category
    categoryId: 1,
  };

  if (id) {
    updateProduct(db, id, productData);
  } else {
    createProduct(db, productData);
  }

  // Invalidate the cache for the products page
  revalidatePath('/products');
  // Redirect to the products page
  redirect('/products');
}

/**
 * Server Action: removeProduct
 *
 * This is another Server Action, this time for deleting a product. It also
 * uses `revalidatePath` to ensure the product list is updated.
 */
export async function removeProduct(id: number) {
  deleteProduct(db, id);
  revalidatePath('/products');
}
