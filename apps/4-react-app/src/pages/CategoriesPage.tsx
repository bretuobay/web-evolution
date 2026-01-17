// src/pages/CategoriesPage.tsx
import React from 'react';
import CategoryList from '../components/categories/CategoryList';

const CategoriesPage: React.FC = () => {
  return (
    <div>
      <h2>Categories</h2>
      <CategoryList />
    </div>
  );
};

export default CategoriesPage;
