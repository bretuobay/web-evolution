<!-- apps/6-mvvm-app/src/views/CategoryView.vue -->
<template>
  <div class="category-panel">
    <div class="panel-header">
      <div>
        <h2 class="ds-era-10s__subtitle">Categories</h2>
        <p class="ds-muted">Filter the product table by selecting a category.</p>
      </div>
      <button
        type="button"
        class="text-button"
        @click="viewModel.selectCategory(null)"
        :disabled="viewModel.selectedCategoryId === null"
      >
        Clear Selection
      </button>
    </div>

    <p v-if="viewModel.isLoading" class="status">Loading categories…</p>
    <p v-else-if="viewModel.errorMessage" class="status status-error">{{ viewModel.errorMessage }}</p>

    <ul v-else class="category-list">
      <li
        v-for="category in viewModel.categories"
        :key="category.id"
        class="category-chip"
        :class="{ 'is-selected': category.id === viewModel.selectedCategoryId }"
        @click="viewModel.selectCategory(category.id)"
      >
        {{ category.name }}
      </li>
    </ul>

    <p v-if="!viewModel.isLoading && viewModel.categories.length === 0" class="status">
      No categories available.
    </p>
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
.category-panel {
  display: flex;
  flex-direction: column;
  gap: var(--ds-spacing);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--ds-spacing);
}

.text-button {
  background: none;
  border: none;
  color: var(--ds-accent);
  font-weight: 600;
  cursor: pointer;
  padding: var(--ds-spacing-xs);
  border-radius: var(--ds-radius-sm);
}

.text-button:disabled {
  color: var(--ds-text);
  cursor: not-allowed;
}

.category-list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: var(--ds-spacing-sm);
  padding: 0;
  margin: 0;
}

.category-chip {
  padding: var(--ds-spacing-sm) var(--ds-spacing);
  border-radius: var(--ds-radius-sm);
  border: 1px solid var(--ds-border);
  background-color: #f1f5f9;
  cursor: pointer;
  transition: all 0.3s;
}

.category-chip:hover {
  border-color: var(--ds-accent);
  color: var(--ds-accent-strong);
}

.category-chip.is-selected {
  background-color: var(--ds-accent);
  color: #fff;
  border-color: transparent;
}

.status {
  font-size: 0.95rem;
  color: var(--ds-muted);
}

.status-error {
  color: var(--ds-error);
}
</style>
