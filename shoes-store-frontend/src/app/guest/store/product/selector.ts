import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ProductResponseInterface} from './types/ProductInterface';
import {BackendErrorInterface} from 'src/app/types/backend.error.interface';

export const productListState =
  createFeatureSelector<Array<ProductResponseInterface>>('productList');

export const productListError =
  createFeatureSelector<BackendErrorInterface>('errors');

export const getProductListState = createSelector(
  productListState,
  (state: Array<ProductResponseInterface>) => {
    return state.filter((product) => Number(product.stock) < 0);
  }
);

export const productListErrorMessage = createSelector(
  productListError,
  (state: BackendErrorInterface) => state.message
);
