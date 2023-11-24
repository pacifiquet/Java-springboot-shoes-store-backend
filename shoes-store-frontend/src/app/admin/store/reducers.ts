import {createFeature, createReducer, on} from '@ngrx/store';
import {
  deleteListProductInitialState,
  productDetailsInitialState,
  uploadProductsInitialState,
} from './initialStateActions';
import {
  deleteListProductActions,
  productDetailsActions,
  productListUploadActions,
} from './actions';

export const productListDeleteFeature = createFeature({
  name: 'deleteProducts',
  reducer: createReducer(
    deleteListProductInitialState,
    on(deleteListProductActions.productListDelete, (state) => ({
      ...state,
      isDeleting: true,
    })),
    on(deleteListProductActions.productListDeleteSuccess, (state, action) => ({
      ...state,
      isDeleting: false,
      response: action.response,
    })),
    on(deleteListProductActions.productListDeleteFailed, (state, action) => ({
      ...state,
      isDeleting: false,
      errors: action.error,
    }))
  ),
});

export const uploadProductListFeature = createFeature({
  name: 'uploadProducts',
  reducer: createReducer(
    uploadProductsInitialState,
    on(productListUploadActions.productListUpload, (state) => ({
      ...state,
      isUploading: true,
    })),
    on(productListUploadActions.productListUploadSuccess, (state, action) => ({
      ...state,
      isUploading: false,
      uploadResponse: action.response,
    })),
    on(productListUploadActions.productListUploadFailed, (state, action) => ({
      ...state,
      isUploading: false,
      uploadError: action.erros,
    }))
  ),
});

export const productDetailsFeature = createFeature({
  name: 'productDetails',
  reducer: createReducer(
    productDetailsInitialState,
    on(productDetailsActions.productDetails, (state) => ({
      ...state,
      isLoaded: false,
    })),
    on(productDetailsActions.productDetailsSuccess, (state, action) => ({
      ...state,
      isLoaded: true,
      product: action.response,
    })),
    on(productDetailsActions.productDetailsFail, (state, action) => ({
      ...state,
      isLoaded: false,
      productError: action.errorResponse,
    }))
  ),
});
