import {createActionGroup, createReducer, props} from '@ngrx/store';
import {BackendSuccessResponseInterface} from 'src/app/types/BackendSuccessResponse.interface';
import {BackendErrorInterface} from '../../types/backend.error.interface';
import {ProductInterface} from 'src/app/guest/store/product/types/ProductInterface';

export const deleteListProductActions = createActionGroup({
  source: 'deleteProducts',
  events: {
    ProductListDelete: props<{request: number[]}>(),
    'ProductListDelete success': props<{
      response: BackendSuccessResponseInterface;
    }>(),
    'ProductListDelete failed': props<{error: BackendErrorInterface}>(),
  },
});

export const productListUploadActions = createActionGroup({
  source: 'uploadProducts',
  events: {
    ProductListUpload: props<{request: File}>(),
    'ProductListUpload success': props<{
      response: BackendSuccessResponseInterface;
    }>(),
    'ProductListUpload failed': props<{erros: BackendErrorInterface}>(),
  },
});

export const productDetailsActions = createActionGroup({
  source: 'productDetails',
  events: {
    ProductDetails: props<{
      request: {id: number};
    }>(),
    'ProductDetails success': props<{
      response: ProductInterface;
    }>(),
    'ProductDetails fail': props<{errorResponse: BackendErrorInterface}>(),
  },
});

export const addProductActions = createActionGroup({
  source: 'addProduct',
  events: {
    AddProduct: props<{
      request: {productInfo: string; productImage: File};
    }>(),
    'AddProduct success': props<{
      response: BackendSuccessResponseInterface;
    }>(),
    'AddProduct fail': props<{errorResponse: BackendErrorInterface}>(),
  },
});

export const deleteProductActions = createActionGroup({
  source: 'deleteProduct',
  events: {
    DeleteProduct: props<{
      request: {id: number};
    }>(),
    'DeleteProduct success': props<{
      deleteProductSuccessResponse: BackendSuccessResponseInterface;
    }>(),
    'DeleteProduct fail': props<{
      deleteProductErrorResponse: BackendErrorInterface;
    }>(),
  },
});

export const updateProductActions = createActionGroup({
  source: 'updateProduct',
  events: {
    UpdateProduct: props<{
      request: {id: number; productRequest: string; productImage: any};
    }>(),
    'UpdateProduct success': props<{
      response: BackendSuccessResponseInterface;
    }>(),
    'UpdateProduct fail': props<{errorResponse: BackendErrorInterface}>(),
  },
});
