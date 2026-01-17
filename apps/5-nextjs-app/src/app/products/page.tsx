// src/app/products/page.tsx
import React, { Suspense } from 'react';
import ProductTable from '@/components/server/ProductTable';
import SearchBar from '@/components/client/SearchBar';
import Loading from './loading';

/**
 * Page: Product List
 *
 * This is a Server Component that composes other components.
 * It uses React's <Suspense> feature to handle the loading state.
 * The `ProductTable` is a Server Component that fetches data, so it can be
 * suspended. The `Loading` component is shown as a fallback while the data
 * is being fetched.
 *
 * This demonstrates Streaming SSR: the initial HTML is sent to the client
 * immediately, with a placeholder for the suspended component. When the data
 * is ready, the server streams the HTML for the `ProductTable` to the client.
 */
export default function ProductsPage({
  searchParams,
}: {
  searchParams?: { search?: string };
}) {
  const search = searchParams?.search || '';

  return (
    <div>
      <h1>Our Products</h1>
      <SearchBar />
      <Suspense fallback={<Loading />}>
        <ProductTable search={search} />
      </Suspense>
      <p className="educational-comment">
        This page is a Server Component. It uses React Suspense to stream the
        product table. The initial page loads instantly with a loading skeleton,
        and the table content is filled in as soon as the data is fetched on the server.
      </p>
    </div>
  );
}
