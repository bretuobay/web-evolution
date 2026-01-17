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
 * Client Component: ProductForm
 *
 * This component is marked with 'use client' because it uses React hooks (`useState`)
 * for managing form state. It's an interactive component that needs to run in the browser.
 *
 * However, the actual data mutation will be handled by a Server Action, which is
 * passed in as the `onSubmit` prop. This keeps the data logic on the server,
 * even though the form itself is a Client Component.
 *
 * This demonstrates the hybrid nature of the Next.js App Router.
 */
const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit }) => {
  const [name, setName] = useState(product?.name || '');
  const [description, setDescription] = useState(product?.description || '');
  const [price, setPrice] = useState(product?.price || 0);
  const [quantity, setQuantity] = useState(product?.quantity || 0);

  return (
    <form action={onSubmit}>
      <input type="hidden" name="id" value={product?.id} />
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
      <p className="educational-comment">
        This is a Client Component ('use client'). It manages its own state for the form inputs.
        When the form is submitted, it calls a Server Action passed via props, keeping the
        mutation logic on the server.
      </p>
    </form>
  );
};

export default ProductForm;
