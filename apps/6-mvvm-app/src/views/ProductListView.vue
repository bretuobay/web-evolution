<!-- apps/6-mvvm-app/src/views/ProductListView.vue -->
<template>
  <div class="product-list">
    <div v-if="viewModel.isLoading" class="status">Loading products…</div>
    <div v-else>
      <table v-if="viewModel.filteredProducts.length" class="ds-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="product in viewModel.filteredProducts"
            :key="product.id"
            :class="{ 'is-selected': viewModel.selectedProduct?.id === product.id }"
            @click="viewModel.selectProduct(product)"
          >
            <td>
              <div class="product-name">{{ product.name }}</div>
              <p class="product-description">{{ product.description }}</p>
            </td>
            <td>${{ product.price.toFixed(2) }}</td>
            <td>{{ product.quantity }}</td>
            <td class="actions-cell">
              <button class="action primary" type="button" @click.stop="viewModel.selectProduct(product)">
                Edit
              </button>
              <button
                class="action danger"
                type="button"
                @click.stop="handleDelete(product.id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else class="status">No products yet. Add one from the form.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ProductListViewModel } from '../viewmodels/ProductListViewModel';

export default defineComponent({
  name: 'ProductListView',
  props: {
    viewModel: {
      type: Object as PropType<ProductListViewModel>,
      required: true,
    },
  },
  setup(props) {
    const handleDelete = (id: number) => {
      if (window.confirm('Are you sure you want to delete this product?')) {
        props.viewModel.deleteProduct(id).catch(() => {});
      }
    };

    return {
      handleDelete,
    };
  },
});
</script>

<style scoped>
.product-list {
  width: 100%;
}

.product-name {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.product-description {
  margin: 0;
  color: var(--ds-muted);
  font-size: 0.9rem;
}

.status {
  color: var(--ds-muted);
  font-size: 0.95rem;
}

.ds-table tbody tr {
  cursor: pointer;
  transition: background 0.2s;
}

.ds-table tbody tr.is-selected {
  background-color: rgba(0, 102, 153, 0.08);
}

.actions-cell {
  display: flex;
  gap: var(--ds-spacing-xs);
}

.action {
  border: none;
  border-radius: var(--ds-radius-sm);
  padding: var(--ds-spacing-xs) var(--ds-spacing-sm);
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.action.primary {
  background-color: var(--ds-accent);
  color: #fff;
}

.action.primary:hover {
  background-color: var(--ds-accent-strong);
}

.action.danger {
  background-color: var(--ds-error);
  color: #fff;
}

.action.danger:hover {
  filter: brightness(1.1);
}
</style>
