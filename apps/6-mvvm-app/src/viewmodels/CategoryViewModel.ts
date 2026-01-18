// apps/6-mvvm-app/src/viewmodels/CategoryViewModel.ts

import { ref, computed } from 'vue';
import { Category } from '../models';
import { fetchApi } from '../utils/api';

/**
 * Manages the state and logic related to product categories.
 * This ViewModel now fetches real data from the API and exposes loading/error indicators.
 */
export class CategoryViewModel {
  private readonly _categories = ref<Category[]>([]);

  readonly selectedCategoryId = ref<number | null>(null);
  readonly isLoading = ref(false);
  readonly errorMessage = ref<string | null>(null);

  constructor() {
    this.loadCategories();
  }

  get categories(): Category[] {
    return this._categories.value;
  }

  get selectedCategory() {
    return computed(() => {
      return this._categories.value.find((c) => c.id === this.selectedCategoryId.value) || null;
    });
  }

  async loadCategories() {
    this.isLoading.value = true;
    this.errorMessage.value = null;
    try {
      const response = await fetchApi('categories');
      if (Array.isArray(response)) {
        this._categories.value = response as Category[];
      } else {
        this._categories.value = [];
      }
    } catch (error) {
      this.errorMessage.value = error instanceof Error ? error.message : 'Unable to load categories';
    } finally {
      this.isLoading.value = false;
    }
  }

  selectCategory(categoryId: number | null) {
    this.selectedCategoryId.value = categoryId;
  }
}
