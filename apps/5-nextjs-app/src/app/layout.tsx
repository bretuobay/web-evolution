import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '@web-evolution/design-system/modern.css';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Web Evolution - Modern Hybrid App',
  description: 'A Next.js application demonstrating React Server Components',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <nav>
            <Link href="/">Home</Link> | <Link href="/products">Products</Link> |{' '}
            <Link href="/categories">Categories</Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          <p>
            Phase 6: The Modern Hybrid (Next.js App Router) - The circle is complete.
          </p>
        </footer>
      </body>
    </html>
  );
}
