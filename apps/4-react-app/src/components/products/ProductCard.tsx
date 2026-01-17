// src/components/products/ProductCard.tsx
import React from 'react';
import { Product } from '../../hooks/useProducts';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="card">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>${product.price}</p>
    </div>
  );
};

export default ProductCard;
