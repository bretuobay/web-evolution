<!-- apps/6-mvvm-app/src/views/ProductListView.vue -->
<template>
  <div class="product-list-container">
    <h2>Products</h2>
    <ul>
      <li
        v-for="product in viewModel.filteredProducts"
        :key="product.id"
        @click="viewModel.selectProduct(product)"
        :class="{ selected: product.id === viewModel.selectedProduct?.id }"
      >
        <span>{{ product.name }}</span>
        <span>${{ product.price.toFixed(2) }}</span>
      </li>
    </ul>
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
});
</script>

<style scoped>
.product-list-container {
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 8px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}

li:hover {
  background-color: #eee;
}

li.selected {
  background-color: #28a745;
  color: white;
  font-weight: bold;
}
</style>
