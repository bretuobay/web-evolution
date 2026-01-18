<!-- apps/6-mvvm-app/src/views/ProductFormView.vue -->
<template>
  <form class="ds-form form-panel" @submit.prevent="viewModel.saveProduct">
    <div class="form-header">
      <div>
        <h2 class="ds-era-10s__subtitle">
          {{ viewModel.formState.id ? 'Edit Product' : 'Add Product' }}
        </h2>
        <p class="ds-muted">
          {{ viewModel.formState.id ? 'You are editing an existing product.' : 'Create a new product that will appear in the list.' }}
        </p>
      </div>
      <p v-if="viewModel.formState.id" class="status">
        ID: {{ viewModel.formState.id }}
      </p>
    </div>

    <div>
      <label for="productName">Name</label>
      <input id="productName" type="text" v-model="viewModel.formState.name" required />
    </div>

    <div>
      <label for="productDescription">Description</label>
      <textarea id="productDescription" rows="3" v-model="viewModel.formState.description" required></textarea>
    </div>

    <div class="form-row">
      <div>
        <label for="productPrice">Price</label>
        <input id="productPrice" type="number" step="0.01" min="0" v-model.number="viewModel.formState.price" required />
      </div>
      <div>
        <label for="productQuantity">Quantity</label>
        <input id="productQuantity" type="number" min="0" v-model.number="viewModel.formState.quantity" />
      </div>
    </div>

    <div>
      <label for="productCategory">Category</label>
      <select id="productCategory" v-model="viewModel.formState.categoryId" required>
        <option value="">Select a category</option>
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
      <button type="submit" :disabled="viewModel.isSubmitting">
        {{ viewModel.isSubmitting ? 'Saving…' : 'Save Product' }}
      </button>
      <button type="button" class="secondary" @click="viewModel.reset()" :disabled="viewModel.isSubmitting">
        Reset
      </button>
    </div>
  </form>
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
    },
  },
});
</script>

<style scoped>
.form-panel {
  display: flex;
  flex-direction: column;
  gap: var(--ds-spacing);
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--ds-spacing);
}

.form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--ds-spacing);
}

.form-actions {
  display: flex;
  gap: var(--ds-spacing-sm);
  justify-content: flex-end;
}

.form-actions button {
  border-radius: var(--ds-radius-sm);
  border: none;
  padding: var(--ds-spacing-sm) var(--ds-spacing);
  font-weight: 600;
  cursor: pointer;
}

.form-actions button.secondary {
  background: #f1f5f9;
  color: var(--ds-text);
}

.form-actions button:not(.secondary) {
  background: var(--ds-accent);
  color: #fff;
}

.form-actions button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.status {
  margin: 0;
  color: var(--ds-muted);
  font-size: 0.9rem;
}

textarea {
  resize: vertical;
}
</style>
