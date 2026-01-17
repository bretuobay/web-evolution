// src/app/page.tsx
import React from 'react';
import Link from 'next/link';

/**
 * Home page entry point.
 */
export default function HomePage() {
  return (
    <div className="ds-era-10s__card ds-stack ds-gap-lg">
      <h1 className="ds-era-10s__title">Welcome to the Modern Hybrid App</h1>
      <p>
        This application is built with the Next.js App Router, showcasing the
        power of React Server Components, Server Actions, and Streaming SSR.
      </p>
      <Link href="/products" className="ds-era-10s__badge">
        View our products
      </Link>
    </div>
  );
}
