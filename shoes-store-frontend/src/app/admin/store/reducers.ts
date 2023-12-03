import {createFeature, createReducer, on} from '@ngrx/store';
import {
  addProductActions,
  deleteProductActions,
  updateProductActions,
} from './actions';
import {
  addProductInitialState,
  deleteProductInitialState,
  deleteProductListInitialState,
  productDetailsInitialState,
  updateProductInitialState,
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
    deleteProductListInitialState,
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

export const addProductFeature = createFeature({
  name: 'addProduct',
  reducer: createReducer(
    addProductInitialState,
    on(addProductActions.addProduct, (state) => ({
      ...state,
      isAddingProduct: true,
    })),
    on(addProductActions.addProductSuccess, (state, action) => ({
      ...state,
      isAddingProduct: false,
      addProductResponse: action.response,
    })),
    on(addProductActions.addProductFail, (state, action) => ({
      ...state,
      isAddingProduct: false,
      addProductErrors: action.errorResponse,
    }))
  ),
});

export const deleteProductFeature = createFeature({
  name: 'deleteProduct',
  reducer: createReducer(
    deleteProductInitialState,
    on(deleteProductActions.deleteProduct, (state) => ({
      ...state,
      isSingleProductDelete: true,
    })),
    on(deleteProductActions.deleteProductSuccess, (state, action) => ({
      ...state,
      isSingleProductDelete: false,
      deleteProductresponse: action.deleteProductSuccessResponse,
    })),
    on(deleteProductActions.deleteProductFail, (state, action) => ({
      ...state,
      isSingleProductDelete: false,
      deleteProducterror: action.deleteProductErrorResponse,
    }))
  ),
});

export const updateProductFeature = createFeature({
  name: 'updateProduct',
  reducer: createReducer(
    updateProductInitialState,
    on(updateProductActions.updateProduct, (state) => ({
      ...state,
      isUpdatingProduct: true,
    })),
    on(updateProductActions.updateProductSuccess, (state, action) => ({
      ...state,
      isUpdatingProduct: false,
      updateProductResponse: action.response,
    })),
    on(updateProductActions.updateProductFail, (state, action) => ({
      ...state,
      isUpdatingProduct: false,
      updateProductError: action.errorResponse,
    }))
  ),
});
