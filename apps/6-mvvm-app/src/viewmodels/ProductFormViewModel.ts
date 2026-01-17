// apps/6-mvvm-app/src/viewmodels/ProductFormViewModel.ts

/**
 * @file This file implements the ProductFormViewModel.
 * This ViewModel is responsible for managing the state of the product form.
 * It is a prime example of how two-way data binding works in an MVVM
 * architecture. The View (the form) and the ViewModel's state are synchronized,
 * meaning that changes in one are automatically reflected in the other.
 */

import { ref, watch } from 'vue';
import { Product } from '../models';
import { ProductListViewModel } from './ProductListViewModel';

/**
 * Manages the state and logic for the product form.
 * This ViewModel demonstrates:
 *
 * - **Two-Way Data Binding**: The `product` ref is directly bound to form
 *   inputs in the View. When a user types into an input, the corresponding
 *   property in the `product` object is updated. Conversely, if the `product`
 *   object is updated programmatically, the form inputs will display the new
 *   values.
 * - **State Initialization**: The form can be initialized with an existing
 *   product for editing, or with a new, empty product for creation.
 * - **Actions**: It provides actions for saving the product, which in this
- *   case adds the product to the product list.
 */
export class ProductFormViewModel {
  /**
   * A reactive reference to the product being edited or created.
   * This object is the heart of the two-way data binding for the form.
   */
  readonly product = ref<Partial<Product>>({
    name: '',
    price: 0,
    categoryId: undefined,
  });

  /**
   * Reference to the ProductListViewModel to add a new product.
   */
  private readonly _productListViewModel: ProductListViewModel;

  constructor(productListViewModel: ProductListViewModel) {
    this._productListViewModel = productListViewModel;

    // Watch for changes in the selected product from the list
    // and update the form accordingly.
    watch(() => this._productListViewModel.selectedProduct.value, (selectedProduct) => {
      if (selectedProduct) {
        this.product.value = { ...selectedProduct };
      } else {
        this.reset();
      }
    });
  }

  /**
   * Saves the product.
   * In a real application, this would likely involve an API call.
   * Here, we're just adding it to our in-memory list.
   */
  saveProduct() {
    if (this.product.value) {
      this._productListViewModel.addProduct(this.product.value as Product);
      this.reset();
    }
  }

  /**
   * Resets the form to a clean state.
   */
  reset() {
    this.product.value = {
      name: '',
      price: 0,
      categoryId: undefined,
    };
    this._productListViewModel.clearProductSelection();
  }
}
