// src/app/products/loading.tsx
import React from 'react';

/**
 * Loading fallback shown while the product table loads.
 */
export default function Loading() {
  return (
    <div className="product-table-loading">
      <p>Loading products...</p>
      {/* You could have a more sophisticated skeleton UI here */}
    </div>
  );
}
