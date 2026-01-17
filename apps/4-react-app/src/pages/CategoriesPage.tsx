// src/pages/CategoriesPage.tsx
import React from 'react';
import CategoryList from '../components/categories/CategoryList';

const CategoriesPage: React.FC = () => {
  return (
    <div className="ds-card">
      <h2 className="ds-era-10s__title">Categories</h2>
      <CategoryList />
    </div>
  );
};

export default CategoriesPage;
