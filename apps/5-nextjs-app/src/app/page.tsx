// src/app/page.tsx
import React from 'react';
import Link from 'next/link';

/**
 * Page: Home
 *
 * The main entry point to the application. It's a Server Component.
 */
export default function HomePage() {
  return (
    <div>
      <h1>Welcome to the Modern Hybrid App</h1>
      <p>
        This application is built with the Next.js App Router, showcasing the
        power of React Server Components, Server Actions, and Streaming SSR.
      </p>
      <Link href="/products">View our products</Link>

      <div className="educational-comment">
        <h3>What's happening here?</h3>
        <p>
          This page is a <strong>React Server Component</strong>. It's rendered on the
          server and sent to your browser as HTML. There's no client-side JavaScript
          needed for this page to be interactive (the link works thanks to standard
          browser behavior and Next.js's router).
        </p>
        <p>
          This is a return to the roots of the web, but with the component model
          of modern frameworks. It results in a faster initial page load and better SEO.
        </p>
      </div>
    </div>
  );
}
