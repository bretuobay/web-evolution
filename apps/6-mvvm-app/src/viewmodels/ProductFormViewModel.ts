// apps/6-mvvm-app/src/viewmodels/ProductFormViewModel.ts

import { ref, watch } from 'vue';
import { Product } from '../models';
import { ProductListViewModel } from './ProductListViewModel';

interface ProductFormState {
  id?: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  categoryId?: number;
}

/**
 * Manages the product form state and synchronizes it with the selected product.
 */
export class ProductFormViewModel {
  readonly formState = ref<ProductFormState>(this.buildDefaultState());
  readonly isSubmitting = ref(false);
  readonly errorMessage = ref<string | null>(null);

  constructor(private readonly _productListViewModel: ProductListViewModel) {
    watch(
      () => this._productListViewModel.selectedProduct.value,
      (selectedProduct) => {
        if (selectedProduct) {
          this.formState.value = { ...selectedProduct };
        } else {
          this.resetState();
        }
      },
      { immediate: true },
    );
  }

  private buildDefaultState(): ProductFormState {
    return {
      name: '',
      description: '',
      price: 0,
      quantity: 1,
      categoryId: undefined,
    };
  }

  private resetState() {
    this.formState.value = this.buildDefaultState();
    this.errorMessage.value = null;
  }

  async saveProduct() {
    const categoryId = Number(this.formState.value.categoryId);
    if (!Number.isFinite(categoryId) || categoryId <= 0) {
      this.errorMessage.value = 'Please select a category';
      return;
    }

    const submission = {
      ...this.formState.value,
      name: this.formState.value.name.trim(),
      description: this.formState.value.description.trim(),
      price: Number(this.formState.value.price),
      quantity: Number(this.formState.value.quantity),
      categoryId,
    };

    this.isSubmitting.value = true;
    this.errorMessage.value = null;

    try {
      if (submission.id) {
        await this._productListViewModel.updateProduct(submission as Product);
      } else {
        const { id, ...payload } = submission;
        await this._productListViewModel.createProduct(payload as Omit<Product, 'id'>);
      }
      this.reset();
    } catch (error) {
      this.errorMessage.value = error instanceof Error ? error.message : 'Unable to save product';
    } finally {
      this.isSubmitting.value = false;
    }
  }

  reset() {
    this.resetState();
    this._productListViewModel.clearProductSelection();
  }
}
