// src/components/client/ProductForm.tsx
'use client';

import React, { useState } from 'react';
import type { Product } from '@wees/shared-types';

interface ProductFormProps {
  product?: Product;
  // We will pass a Server Action to this component for handling form submission
  // This is a key pattern for mutations in the App Router
  onSubmit: (formData: FormData) => void;
}

/**
 * Reusable form for creating or updating a product.
 */
const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit }) => {
  const [name, setName] = useState(product?.name || '');
  const [description, setDescription] = useState(product?.description || '');
  const [price, setPrice] = useState(product?.price || 0);
  const [quantity, setQuantity] = useState(product?.quantity || 0);
  const productId = product?.id ? String(product.id) : '';

  return (
    <form action={onSubmit}>
      <input type="hidden" name="id" value={productId} />
      <div>
        <label htmlFor="name">Product Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="price">Price</label>
        <input
          id="price"
          name="price"
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
        />
      </div>
      <div>
        <label htmlFor="quantity">Quantity</label>
        <input
          id="quantity"
          name="quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          required
        />
      </div>
      <button type="submit">{product ? 'Update' : 'Create'}</button>
    </form>
  );
};

export default ProductForm;
