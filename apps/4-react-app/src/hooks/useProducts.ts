// src/hooks/useProducts.ts
import { useApi } from './useApi';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
}

export const useProducts = () => {
  return useApi<Product>('products', 'products');
};
