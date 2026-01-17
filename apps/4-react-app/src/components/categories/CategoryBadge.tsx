// src/components/categories/CategoryBadge.tsx
import React from 'react';

interface CategoryBadgeProps {
  categoryName: string;
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ categoryName }) => {
  return <span className="ds-era-10s__badge">{categoryName}</span>;
};

export default CategoryBadge;
