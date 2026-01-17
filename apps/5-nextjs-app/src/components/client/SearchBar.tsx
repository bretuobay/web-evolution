// src/components/client/SearchBar.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Client-side search form that updates the product list query.
 */
const SearchBar = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const encoded = encodeURIComponent(query.trim());
    const target = encoded ? `/products?search=${encoded}` : '/products';
    router.push(target);
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
