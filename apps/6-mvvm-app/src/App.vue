<!-- apps/6-mvvm-app/src/App.vue -->
<template>
  <div class="app-shell">
    <header class="ds-card header-card">
      <div>
        <h1 class="ds-era-10s__title">Product Management (MVVM)</h1>
        <p class="ds-muted">A Vue-powered MVVM demo that consumes the same API as the React counterpart.</p>
      </div>
      <nav>
        <ul class="ds-nav">
          <li><a href="#" @click.prevent>Products</a></li>
          <li><a href="#" @click.prevent>Categories</a></li>
        </ul>
      </nav>
    </header>

    <main class="content-grid">
      <section class="ds-card">
        <CategoryView :viewModel="categoryViewModel" />
      </section>

      <section class="ds-card section-card">
        <div class="section-header">
          <div>
            <h2 class="ds-era-10s__subtitle">Products</h2>
            <p class="ds-muted">Browse, edit, and remove products. The list respects the selected category.</p>
          </div>
        </div>
        <ProductListView :viewModel="productListViewModel" />
        <p v-if="productListViewModel.errorMessage" class="status status-error">
          {{ productListViewModel.errorMessage }}
        </p>
      </section>

      <section class="ds-card">
        <ProductFormView
          :viewModel="productFormViewModel"
          :categoryViewModel="categoryViewModel"
        />
        <p v-if="productFormViewModel.errorMessage" class="status status-error">
          {{ productFormViewModel.errorMessage }}
        </p>
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CategoryView from './views/CategoryView.vue';
import ProductListView from './views/ProductListView.vue';
import ProductFormView from './views/ProductFormView.vue';
import { CategoryViewModel } from './viewmodels/CategoryViewModel';
import { ProductListViewModel } from './viewmodels/ProductListViewModel';
import { ProductFormViewModel } from './viewmodels/ProductFormViewModel';

export default defineComponent({
  name: 'App',
  components: {
    CategoryView,
    ProductListView,
    ProductFormView,
  },
  setup() {
    const categoryViewModel = new CategoryViewModel();
    const productListViewModel = new ProductListViewModel(categoryViewModel);
    const productFormViewModel = new ProductFormViewModel(productListViewModel);

    return {
      categoryViewModel,
      productListViewModel,
      productFormViewModel,
    };
  },
});
</script>

<style scoped>
.app-shell {
  display: flex;
  flex-direction: column;
  gap: var(--ds-spacing);
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--ds-spacing);
}

.header-card {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--ds-spacing);
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--ds-spacing);
}

.section-header {
  margin-bottom: var(--ds-spacing-sm);
}

.status {
  margin-top: var(--ds-spacing-sm);
  color: var(--ds-muted);
}

.status-error {
  color: var(--ds-error);
}
</style>
