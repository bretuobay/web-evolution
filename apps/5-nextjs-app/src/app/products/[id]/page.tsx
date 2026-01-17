// src/app/products/[id]/page.tsx
import React from 'react';
import { getProductById } from '@wees/database/client';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import Image from 'next/image';

/**
 * Page: Product Detail
 *
 * This is a dynamic Server Component. The `params` object contains the route
 * parameters, in this case, the product `id`.
 *
 * It fetches data for a single product and displays it. If the product is not
 * found, it calls the `notFound()` function from Next.js, which will render
 * the nearest `not-found.tsx` file or a default 404 page.
 *
 * It also uses the `next/image` component for optimized image loading.
 */
export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = getProductById(db, Number(params.id));

  if (!product) {
    notFound();
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <Image
        src={`/images/product-${product.id % 5}.jpg`}
        alt={product.name}
        width={400}
        height={400}
        priority // The largest image on the page, so we prioritize its loading
      />
      <p>{product.description}</p>
      <p>Price: ${product.price.toFixed(2)}</p>
      <p>In Stock: {product.quantity}</p>
      <p className="educational-comment">
        This is a dynamic server-rendered page. The data is fetched on the server
        for each request. The `next/image` component automatically optimizes the image,
        serving it in a modern format like WebP.
      </p>
    </div>
  );
}
