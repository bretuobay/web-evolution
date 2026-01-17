// src/app/products/[id]/page.tsx
import React from 'react';
import { getProductById, getCategoryById } from '@wees/database';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

/**
 * Product detail page.
 */
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const product = getProductById(db, Number(resolvedParams.id));

  if (!product) {
    notFound();
  }

  const category =
    product.categoryId > 0 ? getCategoryById(db, product.categoryId) : null;

  return (
    <div className="ds-era-10s__card ds-stack ds-gap-lg">
      <div>
        <h1 className="ds-era-10s__title">{product.name}</h1>
        <div className="ds-flex ds-gap-sm">
          <Link href={`/products/${product.id}/edit`}>Edit product</Link>
          <Link href="/products">Back to list</Link>
        </div>
      </div>
      <Image
        src={`/images/product-${product.id % 5}.jpg`}
        alt={product.name}
        width={400}
        height={400}
        priority
      />
      <p>{product.description}</p>
      <p>
        <strong>Category:</strong> {category?.name ?? 'Uncategorized'}
      </p>
      <p>Price: ${product.price.toFixed(2)}</p>
      <p>In Stock: {product.quantity}</p>
    </div>
  );
}
