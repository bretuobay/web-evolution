// apps/6-mvvm-app/src/viewmodels/ProductListViewModel.ts

/**
 * @file This file implements the ProductListViewModel.
 * This ViewModel is responsible for managing the list of products that are
 * displayed to the user. It demonstrates how ViewModels can collaborate and
 * share state, as it depends on the `CategoryViewModel` to filter products.
 */

import { ref, computed } from 'vue';
import { Product, sampleProducts } from '../models';
import { CategoryViewModel } from './CategoryViewModel';

/**
 * Manages the state and logic related to the product list.
 * This ViewModel showcases:
 *
 * - **Computed Properties**: `filteredProducts` is a computed property that
 *   reactively updates when the selected category changes. This is a powerful
 *   feature of MVVM for creating dynamic UIs.
 * - **ViewModel Collaboration**: It takes an instance of `CategoryViewModel`
 *   as a dependency, allowing it to react to changes in the category selection.
 *   This promotes a modular and maintainable architecture.
 * - **State Management**: It holds the list of all products and the currently
 *   selected product.
 */
export class ProductListViewModel {
  /**
   * A reactive reference to the list of all products.
   */
  private readonly _products = ref<Product[]>([]);

  /**
   * A reactive reference to the currently selected product.
   */
  readonly selectedProduct = ref<Product | null>(null);

  /**
   * An instance of `CategoryViewModel` to observe category selections.
   */
  private readonly _categoryViewModel: CategoryViewModel;

  constructor(categoryViewModel: CategoryViewModel) {
    this._categoryViewModel = categoryViewModel;
    // In a real application, this data would be fetched from an API.
    this._products.value = sampleProducts;
  }

  /**
   * A computed property that returns a list of products filtered by the
   * currently selected category.
   * This property automatically re-evaluates whenever the selected category
   * in `CategoryViewModel` changes, or when the list of products changes.
   */
  get filteredProducts() {
    return computed(() => {
      const categoryId = this._categoryViewModel.selectedCategoryId.value;
      if (categoryId === null) {
        return this._products.value;
      }
      return this._products.value.filter(p => p.categoryId === categoryId);
    });
  }

  /**
   * Action to select a product.
   * This method is called from the View to update the ViewModel's state.
   * @param product - The product to select.
   */
  selectProduct(product: Product) {
    this.selectedProduct.value = product;
  }

  /**
   * Action to clear the product selection.
   */
  clearProductSelection() {
    this.selectedProduct.value = null;
  }

    /**
   * Adds a new product to the list.
   * @param product The product to add.
   */
    addProduct(product: Product) {
        const newProduct = { ...product, id: Date.now() };
        this._products.value.push(newProduct);
    }
}
