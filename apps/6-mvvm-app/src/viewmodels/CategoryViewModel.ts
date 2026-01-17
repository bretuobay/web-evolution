// apps/6-mvvm-app/src/viewmodels/CategoryViewModel.ts

/**
 * @file This file implements the CategoryViewModel.
 * In MVVM, the ViewModel is a key component that acts as a bridge between the
 * View (the UI) and the Model (the data). It is responsible for exposing data
 * from the Model to the View and for handling user interactions. The ViewModel
 * is designed to be completely independent of the View, which allows for
 * better testability and separation of concerns.
 */

import { ref, computed } from 'vue';
import { Category, sampleCategories } from '../models';

/**
 * Manages the state and logic related to product categories.
 * This class demonstrates several key MVVM concepts:
 *
 * - **State Management**: The ViewModel holds the state relevant to the view,
 *   such as the list of categories and the currently selected category.
 * - **Business Logic**: It contains logic for filtering and managing categories.
 * - **Reactivity**: Vue's `ref` and `computed` are used to create reactive
 *   properties. When these properties change, the View will automatically update.
 */
export class CategoryViewModel {
  /**
   * A reactive reference to the list of all categories.
   * `ref` creates a reactive object that Vue tracks for changes.
   */
  private readonly _categories = ref<Category[]>([]);

  /**
   * A reactive reference to the ID of the currently selected category.
   * This is part of the ViewModel's state.
   */
  readonly selectedCategoryId = ref<number | null>(null);

  constructor() {
    // In a real application, you would fetch this data from an API.
    this._categories.value = sampleCategories;
  }

  /**
   * Exposes the list of categories as a read-only computed property.
   * This prevents the View from directly modifying the list.
   */
  get categories() {
    return computed(() => this._categories.value);
  }

  /**
   * A computed property that returns the currently selected category object.
   * `computed` creates a value that is derived from other reactive properties.
   * It will automatically update if `selectedCategoryId` or `_categories` changes.
   */
  get selectedCategory() {
    return computed(() => {
      return this._categories.value.find(c => c.id === this.selectedCategoryId.value) || null;
    });
  }

  /**
   * Action to select a category.
   * This method is called by the View to update the ViewModel's state.
   * @param categoryId - The ID of the category to select.
   */
  selectCategory(categoryId: number | null) {
    this.selectedCategoryId.value = categoryId;
  }
}
