// src/components/client/SearchBar.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Client Component: SearchBar
 *
 * This component uses the `useState` hook to manage the search input's state
 * and the `useRouter` hook for navigation. This makes it a Client Component.
 *
 * When the form is submitted, it navigates to the products page with the search
 * query as a URL parameter. The Server Component on that page will then use this
 * parameter to filter the data.
 *
 * This is a common pattern for integrating client-side interactivity with
 * server-side data fetching. The client handles the user input, and the server
 * handles the data fetching based on that input.
 */
const SearchBar = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/products?search=${query}`);
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
      <p className="educational-comment">
        This SearchBar is a Client Component. It captures user input and uses the Next.js
        router to pass the search query to a Server Component via URL parameters.
      </p>
    </form>
  );
};

export default SearchBar;
