// src/components/server/CategoryNav.tsx
import React from 'react';
import { listCategories } from '@wees/database';
import { db } from '@/lib/db';
import Link from 'next/link';

/**
 * Server-side navigation that renders all categories.
 */
const CategoryNav = () => {
  const categories = listCategories(db);

  return (
    <nav className="category-nav">
      <h3 className="ds-era-10s__title">Categories</h3>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <Link href={`/categories/${category.id}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategoryNav;
