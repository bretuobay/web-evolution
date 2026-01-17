// src/pages/ProductDetailPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchApi } from '../utils/api';
import { Product } from '../hooks/useProducts';
import { Category } from '../hooks/useCategories';
import CategoryBadge from '../components/categories/CategoryBadge';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useQuery<Product, Error>({
    queryKey: ['products', id],
    queryFn: () => fetchApi(`products/${id}`),
  });

  const { data: category } = useQuery<Category, Error>({
    queryKey: ['categories', product?.categoryId],
    queryFn: () => fetchApi(`categories/${product?.categoryId}`),
    enabled: !!product, // Only fetch the category if the product has been loaded
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="ds-card ds-stack">
      <h2 className="ds-era-10s__title">{product.name}</h2>
      {category && <CategoryBadge categoryName={category.name} />}
      <p>{product.description}</p>
      <p><strong>Price:</strong> ${product.price}</p>
    </div>
  );
};

export default ProductDetailPage;
