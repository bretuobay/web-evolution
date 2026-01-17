// src/components/server/ProductTable.tsx
import React from 'react';
import { listProducts } from '@wees/database';
import { db } from '@/lib/db';
import Link from 'next/link';
import DeleteButton from '@/components/client/DeleteButton';
import { removeProduct } from '@/lib/actions';

/**
 * Server-side table that renders product rows.
 */
const ProductTable = ({ search }: { search: string }) => {
  const { data: products } = listProducts(db, { search });

  return (
    <div className="product-table-container">
      <div
        className="ds-flex"
        style={{ justifyContent: 'space-between', alignItems: 'center', gap: 'var(--ds-spacing)' }}
      >
        <h2 className="ds-era-10s__title" style={{ margin: 0 }}>Products</h2>
        <Link href="/products/new" className="ds-era-10s__badge">
          Add New Product
        </Link>
      </div>
      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 && (
            <tr>
              <td colSpan={4}>No products found.</td>
            </tr>
          )}
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <Link href={`/products/${product.id}`}>{product.name}</Link>
              </td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.quantity}</td>
              <td>
                <div className="product-actions">
                  <Link href={`/products/${product.id}`} className="ds-era-10s__badge">
                    View Details
                  </Link>
                  <Link href={`/products/${product.id}/edit`} className="ds-era-10s__badge">
                    Edit
                  </Link>
                  <DeleteButton id={product.id} deleteAction={removeProduct} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
