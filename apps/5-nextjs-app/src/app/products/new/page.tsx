// src/app/products/new/page.tsx
import React from 'react';
import ProductForm from '@/components/client/ProductForm';
import { createOrUpdateProduct } from '@/lib/actions';

/**
 * Page: New Product
 *
 * This is a Server Component that renders a Client Component (`ProductForm`).
 * This is a common pattern: the page itself is a Server Component, but it
 * uses interactive Client Components where needed.
 *
 * The Server Action `createOrUpdateProduct` is passed directly to the `onSubmit`
 * prop of the `ProductForm`. This is a powerful feature of the Next.js App Router,
 * allowing you to seamlessly connect client-side interactions with server-side logic.
 */
export default function NewProductPage() {
  return (
    <div>
      <h1>Add a New Product</h1>
      <ProductForm onSubmit={createOrUpdateProduct} />
      <p className="educational-comment">
        This page demonstrates a Server Component (`NewProductPage`) rendering a
        Client Component (`ProductForm`). The form's submission is handled by a
        Server Action, which runs on the server. This keeps the client-side JavaScript
        bundle small and the mutation logic secure on the server.
      </p>
    </div>
  );
}
