<!-- apps/6-mvvm-app/src/views/CategoryView.vue -->
<template>
  <div class="categories-container">
    <h2>Categories</h2>
    <ul>
      <li
        v-for="category in viewModel.categories"
        :key="category.id"
        :class="{ selected: category.id === viewModel.selectedCategoryId }"
        @click="viewModel.selectCategory(category.id)"
      >
        {{ category.name }}
      </li>
    </ul>
    <button @click="viewModel.selectCategory(null)" class="clear-selection-button">
      Clear Selection
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { CategoryViewModel } from '../viewmodels/CategoryViewModel';

export default defineComponent({
  name: 'CategoryView',
  props: {
    viewModel: {
      type: Object as PropType<CategoryViewModel>,
      required: true,
    },
  },
});
</script>

<style scoped>
.categories-container {
  padding: 1rem;
  background-color: #f0f0f0;
  border-radius: 8px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}

li:hover {
  background-color: #ddd;
}

li.selected {
  background-color: #007bff;
  color: white;
  font-weight: bold;
}

.clear-selection-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.clear-selection-button:hover {
  background-color: #c82333;
}
</style>
