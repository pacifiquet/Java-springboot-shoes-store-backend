import {createFeature, createReducer, on} from '@ngrx/store';
import {productListInitialState} from './initialActionState';
import {productListActions} from './actions';

export const productListFeature = createFeature({
  name: 'productList',
  reducer: createReducer(
    productListInitialState,
    on(productListActions.productList, (state) => ({
      ...state,
      isProductsLoaded: false,
    })),
    on(productListActions.productListSuccess, (state, action) => ({
      ...state,
      isProductsLoaded: true,
      productList: action.response,
    })),
    on(productListActions.productListFail, (state, action) => ({
      ...state,
      isProductsLoaded: false,
      errors: action.errorResponse,
    }))
  ),
});
