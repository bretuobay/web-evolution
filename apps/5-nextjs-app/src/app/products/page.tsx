// src/app/products/page.tsx
import React, { Suspense } from 'react';
import ProductTable from '@/components/server/ProductTable';
import SearchBar from '@/components/client/SearchBar';
import Loading from './loading';

export const dynamic = 'force-dynamic';

type MaybePromise<T> = T | Promise<T>;

type ProductsPageProps = {
  searchParams?: MaybePromise<{ search?: string }>;
};

/**
 * Products page that shows the search bar and table.
 */
export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedSearchParams = await searchParams;
  const search = resolvedSearchParams?.search || '';

  return (
    <div className="ds-era-10s__card ds-stack ds-gap-lg">
      <div
        className="ds-flex"
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--ds-spacing)',
        }}
      >
        <h1 className="ds-era-10s__title" style={{ margin: 0 }}>
          Our Products
        </h1>
        <SearchBar />
      </div>
      <Suspense fallback={<Loading />}>
        <ProductTable search={search} />
      </Suspense>
    </div>
  );
}
