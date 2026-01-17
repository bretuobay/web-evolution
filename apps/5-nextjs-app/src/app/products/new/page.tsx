// src/app/products/new/page.tsx
import React from 'react';
import ProductForm from '@/components/client/ProductForm';
import { createOrUpdateProduct } from '@/lib/actions';
import Link from 'next/link';

/**
 * Page for creating a new product.
 */
export default function NewProductPage() {
  return (
    <div className="ds-era-10s__card ds-stack ds-gap-lg">
      <h1 className="ds-era-10s__title">Add a New Product</h1>
      <ProductForm onSubmit={createOrUpdateProduct} />
      <div className="ds-flex ds-gap-sm">
        <Link href="/products">← Back to products</Link>
      </div>
    </div>
  );
}
