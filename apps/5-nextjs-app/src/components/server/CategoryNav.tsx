// src/components/server/CategoryNav.tsx
import React from 'react';
import { listCategories } from '@wees/database/client';
import { db } from '@/lib/db';
import Link from 'next/link';

/**
 * Server Component: CategoryNav
 *
 * This component fetches category data on the server and renders a navigation menu.
 * Like ProductTable, it accesses the database directly. This is a powerful pattern
 * for components that need data but don't require user interactivity.
 *
 * Contrast with a client-side approach where you might fetch this data once
 * and store it in a global state manager (like Redux or React Context).
 * Here, the data is fresh on each navigation to a page using this layout.
 */
const CategoryNav = () => {
  const categories = listCategories(db);

  return (
    <nav className="category-nav">
      <h3>Categories</h3>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <Link href={`/categories/${category.id}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
      <p className="educational-comment">
        This navigation menu is a Server Component. It's rendered on the server
        and sent to the client as HTML. This improves initial page load performance
        and SEO.
      </p>
    </nav>
  );
};

export default CategoryNav;
