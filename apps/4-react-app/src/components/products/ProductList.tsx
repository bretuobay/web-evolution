// src/components/products/ProductList.tsx
import React from 'react';
import { useProducts, Product } from '../../hooks/useProducts';
import Table from '../common/Table';
import Button from '../common/Button';

interface ProductListProps {
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ onEdit, onDelete }) => {
  const { data: products = [], isLoading, error } = useProducts();

  if (isLoading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const columns = [
    { header: 'Name', accessor: 'name' as keyof Product },
    { header: 'Price', accessor: 'price' as keyof Product },
  ];

  return (
    <Table<Product>
      columns={columns}
      data={products}
      renderActions={(product) => (
        <>
          <Button onClick={() => onEdit(product)} variant="secondary">Edit</Button>
          <Button onClick={() => onDelete(product.id)} variant="danger">Delete</Button>
        </>
      )}
    />
  );
};

export default ProductList;
