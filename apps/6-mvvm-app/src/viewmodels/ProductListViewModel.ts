// apps/6-mvvm-app/src/viewmodels/ProductListViewModel.ts

import { ref, computed } from 'vue';
import { Product } from '../models';
import { fetchApi } from '../utils/api';
import { CategoryViewModel } from './CategoryViewModel';

type ProductsResponse = { data: Product[] } | Product[];

/**
 * Manages the state and logic related to the product list, including API interaction.
 */
export class ProductListViewModel {
  private readonly _products = ref<Product[]>([]);
  readonly selectedProduct = ref<Product | null>(null);
  readonly isLoading = ref(false);
  readonly isMutating = ref(false);
  readonly errorMessage = ref<string | null>(null);

  constructor(private readonly _categoryViewModel: CategoryViewModel) {
    this.loadProducts();
  }

  get filteredProducts(): Product[] {
    const categoryId = this._categoryViewModel.selectedCategoryId.value;
    if (categoryId === null) {
      return this._products.value;
    }
    return this._products.value.filter((product) => product.categoryId === categoryId);
  }

  private parseProductsResponse(response: ProductsResponse | unknown): Product[] {
    if (Array.isArray(response)) {
      return response;
    }
    if (response && typeof response === 'object' && 'data' in response && Array.isArray((response as ProductsResponse).data)) {
      return (response as ProductsResponse).data;
    }
    return [];
  }

  async loadProducts() {
    this.isLoading.value = true;
    this.errorMessage.value = null;
    try {
      const response = await fetchApi('products');
      this._products.value = this.parseProductsResponse(response);
    } catch (error) {
      this.errorMessage.value = error instanceof Error ? error.message : 'Unable to load products';
    } finally {
      this.isLoading.value = false;
    }
  }

  selectProduct(product: Product) {
    this.selectedProduct.value = { ...product };
  }

  clearProductSelection() {
    this.selectedProduct.value = null;
  }

  private async performMutation(action: () => Promise<void>, fallbackMessage: string) {
    this.isMutating.value = true;
    this.errorMessage.value = null;
    try {
      await action();
      await this.loadProducts();
    } catch (error) {
      this.errorMessage.value = error instanceof Error ? error.message : fallbackMessage;
      throw error;
    } finally {
      this.isMutating.value = false;
    }
  }

  async createProduct(product: Omit<Product, 'id'>) {
    await this.performMutation(
      () => fetchApi('products', { method: 'POST', body: JSON.stringify(product) }).then(() => undefined),
      'Unable to create product',
    );
  }

  async updateProduct(product: Product) {
    await this.performMutation(
      () => fetchApi(`products/${product.id}`, { method: 'PUT', body: JSON.stringify(product) }).then(() => undefined),
      'Unable to update product',
    );
  }

  async deleteProduct(id: number) {
    if (this.selectedProduct.value?.id === id) {
      this.clearProductSelection();
    }
    await this.performMutation(
      () => fetchApi(`products/${id}`, { method: 'DELETE' }).then(() => undefined),
      'Unable to delete product',
    );
  }
}
