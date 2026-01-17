// src/pages/ProductsPage.tsx
import React, { useState } from 'react';
import ProductList from '../components/products/ProductList';
import ProductForm from '../components/products/ProductForm';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import { useProducts, Product } from '../hooks/useProducts';

const ProductsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { createItem, updateItem, deleteItem } = useProducts();

  const handleOpenModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteItem.mutate(id);
    }
  };

  const handleSubmit = (product: Omit<Product, 'id'> | Product) => {
    if ('id' in product) {
      updateItem.mutate(product);
    } else {
      createItem.mutate(product);
    }
    handleCloseModal();
  };

  return (
    <div className="ds-card">
      <div className="ds-flex" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--ds-spacing)' }}>
        <h2 className="ds-era-10s__title" style={{ margin: 0 }}>Products</h2>
        <Button onClick={handleOpenModal}>Add Product</Button>
      </div>
      <ProductList onEdit={handleEdit} onDelete={handleDelete} />
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingProduct ? 'Edit Product' : 'Add Product'}
      >
        <ProductForm
          product={editingProduct}
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default ProductsPage;
