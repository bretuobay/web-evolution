// src/components/server/ProductTable.tsx
import React from 'react';
import { listProducts } from '@wees/database/client';
import { db } from '@/lib/db';
import Link from 'next/link';
import DeleteButton from '@/components/client/DeleteButton';
import { removeProduct } from '@/lib/actions';

/**
 * Server Component: ProductTable
 *
 * This component fetches product data directly from the database on the server.
 * It demonstrates the "get data where you use it" pattern in Next.js App Router.
 * There's no need for `useEffect` or client-side data fetching libraries.
 *
 * Contrast with 4-react-app/src/components/ProductList.tsx, which fetches data
 * on the client side after the initial render.
 */
const ProductTable = ({ search }: { search: string }) => {
  const { data: products } = listProducts(db, { search });

  return (
    <div className="product-table-container">
      <h2>Products</h2>
      <Link href="/products/new">Add New Product</Link>
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
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <Link href={`/products/${product.id}`}>{product.name}</Link>
              </td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.quantity}</td>
              <td>
                <Link href={`/products/${product.id}/edit`}>Edit</Link>
                {/* Delete functionality will be handled by a Client Component */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="educational-comment">
        This table is rendered on the server. The data is fetched directly
        from the database within the component. Notice the lack of `useState`
        or `useEffect`. This is a core concept of React Server Components.
      </p>
    </div>
  );
};

export default ProductTable;
