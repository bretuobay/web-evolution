// src/app/products/loading.tsx
import React from 'react';

/**
 * Component: Loading
 *
 * This is a special Next.js file. It's a loading UI that will be shown
 * as a fallback for a `<Suspense>` boundary.
 *
 * In this app, it's used in `products/page.tsx` while the `ProductTable`
 * is fetching data. This allows for Streaming SSR.
 */
export default function Loading() {
  return (
    <div className="product-table-loading">
      <p>Loading products...</p>
      {/* You could have a more sophisticated skeleton UI here */}
    </div>
  );
}
