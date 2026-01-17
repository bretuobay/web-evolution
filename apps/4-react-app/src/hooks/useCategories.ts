// src/hooks/useCategories.ts
import { useApi } from './useApi';

export interface Category {
  id: number;
  name: string;
}

export const useCategories = () => {
  return useApi<Category>('categories', 'categories');
};
