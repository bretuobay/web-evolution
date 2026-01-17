// src/components/categories/CategoryList.tsx
import React from 'react';
import { useCategories, Category } from '../../hooks/useCategories';
import Table from '../common/Table';
import Button from '../common/Button';

const CategoryList: React.FC = () => {
  const { data: categories = [], isLoading, error } = useCategories();

  if (isLoading) return <div>Loading categories...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const columns = [
    { header: 'Name', accessor: 'name' as keyof Category },
  ];

  return (
    <Table<Category>
      columns={columns}
      data={categories}
      renderActions={() => (
        <>
          <Button variant="secondary">Edit</Button>
          <Button variant="danger">Delete</Button>
        </>
      )}
    />
  );
};

export default CategoryList;
