// src/app/categories/page.tsx
import React from 'react';
import CategoryNav from '@/components/server/CategoryNav';

/**
 * Page: Categories
 *
 * A simple Server Component that displays the category navigation.
 */
export default function CategoriesPage() {
  return (
    <div>
      <h1>All Categories</h1>
      <CategoryNav />
    </div>
  );
}
