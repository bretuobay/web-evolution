// src/app/products/[id]/edit/page.tsx
import ProductForm from '@/components/client/ProductForm';
import { createOrUpdateProduct } from '@/lib/actions';
import { db } from '@/lib/db';
import { getProductById } from '@wees/database';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

/**
 * Page for editing an existing product.
 */
export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = Number(resolvedParams.id);
  const product = getProductById(db, id);

  if (!product) {
    notFound();
  }

  return (
    <div className="ds-era-10s__card ds-stack ds-gap-lg">
      <h1 className="ds-era-10s__title">Edit {product.name}</h1>
      <ProductForm product={product} onSubmit={createOrUpdateProduct} />
      <div className="ds-flex ds-gap-sm">
        <Link href="/products">← Back to products</Link>
      </div>
    </div>
  );
}
