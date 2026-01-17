<!-- apps/6-mvvm-app/src/App.vue -->
<template>
  <div id="app" class="app-container">
    <header>
      <h1>MVVM Application Example</h1>
      <p>A demonstration of the Model-View-ViewModel pattern using Vue.js</p>
    </header>
    <main class="main-content">
      <div class="column">
        <category-view :viewModel="categoryViewModel" />
      </div>
      <div class="column">
        <product-list-view :viewModel="productListViewModel" />
      </div>
      <div class="column">
        <product-form-view
          :viewModel="productFormViewModel"
          :categoryViewModel="categoryViewModel"
        />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CategoryViewModel } from './viewmodels/CategoryViewModel';
import { ProductListViewModel } from './viewmodels/ProductListViewModel';
import { ProductFormViewModel } from './viewmodels/ProductFormViewModel';
import CategoryView from './views/CategoryView.vue';
import ProductListView from './views/ProductListView.vue';
import ProductFormView from './views/ProductFormView.vue';

export default defineComponent({
  name: 'App',
  components: {
    CategoryView,
    ProductListView,
    ProductFormView,
  },
  setup() {
    // Instantiate the ViewModels
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

<style>
/* Global styles */
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f9;
  color: #333;
  margin: 0;
  padding: 1rem;
}
</style>

<style scoped>
.app-container {
  max-width: 1200px;
  margin: 0 auto;
}

header {
  text-align: center;
  margin-bottom: 2rem;
  background-color: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.main-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.column {
  background-color: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

h1, h2 {
    color: #007bff;
}
</style>
