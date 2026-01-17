<!-- apps/6-mvvm-app/src/views/ProductFormView.vue -->
<template>
  <div class="product-form-container">
    <h2>Product Form</h2>
    <form @submit.prevent="viewModel.saveProduct()">
      <div class="form-group">
        <label for="productName">Name</label>
        <input
          id="productName"
          type="text"
          v-model="viewModel.product.name"
          required
        />
      </div>
      <div class="form-group">
        <label for="productPrice">Price</label>
        <input
          id="productPrice"
          type="number"
          v-model.number="viewModel.product.price"
          required
        />
      </div>
      <div class="form-group">
        <label for="productCategory">Category</label>
        <select
          id="productCategory"
          v-model.number="viewModel.product.categoryId"
          required
        >
          <option
            v-for="category in categoryViewModel.categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>
      <div class="form-actions">
        <button type="submit">Save Product</button>
        <button type="button" @click="viewModel.reset()">Reset</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ProductFormViewModel } from '../viewmodels/ProductFormViewModel';
import { CategoryViewModel } from '../viewmodels/CategoryViewModel';

export default defineComponent({
  name: 'ProductFormView',
  props: {
    viewModel: {
      type: Object as PropType<ProductFormViewModel>,
      required: true,
    },
    categoryViewModel: {
        type: Object as PropType<CategoryViewModel>,
        required: true,
    }
  },
});
</script>

<style scoped>
.product-form-container {
  padding: 1rem;
  background-color: #eef;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input,
select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button[type="submit"] {
  background-color: #007bff;
  color: white;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}

button[type="button"] {
  background-color: #6c757d;
  color: white;
}

button[type="button"]:hover {
  background-color: #5a6268;
}
</style>
