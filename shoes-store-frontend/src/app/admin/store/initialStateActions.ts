import {ProductDetailsInterface} from 'src/app/guest/store/product/types/ProductInterface';
import {
  AddProductInterface,
  ProductDeleteInterface,
  ProductListDeleteInterface,
  ProductUpdateInterface,
} from './types/ProductDeleteState';
import {ProductListUploadState} from './types/ProductListUpload';

export const deleteProductListInitialState: ProductListDeleteInterface = {
  isDeleting: false,
  response: undefined,
  errors: null,
};

export const uploadProductsInitialState: ProductListUploadState = {
  isUploading: true,
  uploadResponse: undefined,
  uploadError: null,
};

export const productDetailsInitialState: ProductDetailsInterface = {
  isLoaded: false,
  product: null,
  productError: null,
};

export const addProductInitialState: AddProductInterface = {
  isAddingProduct: false,
  addProductResponse: null,
  addProductErrors: null,
};

export const deleteProductInitialState: ProductDeleteInterface = {
  isSingleProductDelete: false,
  deleteProductresponse: undefined,
  deleteProducterror: null,
};

export const updateProductInitialState: ProductUpdateInterface = {
  isUpdatingProduct: false,
  updateProductResponse: undefined,
  updateProductError: null,
};
