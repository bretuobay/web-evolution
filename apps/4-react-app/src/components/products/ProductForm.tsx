// src/components/products/ProductForm.tsx
import React, { useState, useEffect } from 'react';
import { Product } from '../../hooks/useProducts';
import { useCategories, Category } from '../../hooks/useCategories';
import Input from '../common/Input';
import Button from '../common/Button';

interface ProductFormProps {
  product?: Product | null;
  onSubmit: (product: Omit<Product, 'id'> | Product) => void;
  onCancel: () => void;
}

/**
 * Historical Context: Controlled Components
 *
 * In traditional web development (like with jQuery), you would typically read the values
 * from form fields only when the form was submitted. The state of the form was held in the DOM itself.
 *
 * React introduced the concept of "controlled components". In this pattern, the React component's
 * state is the single source of truth for the form input's value. Every time the input changes,
 * an `onChange` event is fired, and the component's state is updated. The input's `value` prop
 * is then set to this state.
 *
 * This `ProductForm` component is a classic example of controlled components.
 * - The `formData` state object holds the current values for all form fields.
 * - Each `<Input>` has its `value` set to the corresponding property in `formData`.
 * - Each `<Input>` has an `onChange` handler (`handleChange`) that updates the `formData` state.
 *
 * Why do this?
 * 1.  **Immediate Validation**: You can validate input on every keystroke.
 * 2.  **Conditional Logic**: You can easily disable the submit button, show/hide fields, or
 *     change other parts of the UI based on the form's state.
 * 3.  **Single Source of Truth**: The component's state always represents the exact state of the form,
 *     making it easier to reason about and manage.
 * 4.  **Formatting**: You can format or constrain input values as the user types.
 *
 * This pattern centralizes form logic within the component, making it more predictable and
 * easier to debug than reaching into the DOM to get values.
 */
const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: '',
  });

  const { data: categories = [], isLoading: isLoadingCategories } = useCategories();

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: String(product.price),
        categoryId: String(product.categoryId),
      });
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submission = {
      ...formData,
      price: parseFloat(formData.price),
      categoryId: parseInt(formData.categoryId, 10),
    };
    if (product) {
      onSubmit({ ...submission, id: product.id });
    } else {
      onSubmit(submission);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <Input name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Description</label>
        <Input name="description" value={formData.description} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Price</label>
        <Input name="price" type="number" value={formData.price} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Category</label>
        <select name="categoryId" value={formData.categoryId} onChange={handleChange} required>
          <option value="">Select a category</option>
          {isLoadingCategories ? (
            <option>Loading...</option>
          ) : (
            categories.map((cat: Category) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))
          )}
        </select>
      </div>
      <Button type="submit">Submit</Button>
      <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
    </form>
  );
};

export default ProductForm;
