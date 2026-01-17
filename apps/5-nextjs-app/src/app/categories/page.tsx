// src/app/categories/page.tsx
import React from 'react';
import CategoryNav from '@/components/server/CategoryNav';

/**
 * Categories navigation page.
 */
export default function CategoriesPage() {
  return (
    <div className="ds-era-10s__card ds-stack ds-gap-lg">
      <h1 className="ds-era-10s__title">All Categories</h1>
      <CategoryNav />
    </div>
  );
}
