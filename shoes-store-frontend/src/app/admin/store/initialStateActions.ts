import {ProductDetailsInterface} from 'src/app/guest/store/product/types/ProductInterface';
import {ProductListDeleteInterface} from './types/ProductDeleteState';
import {ProductListUploadState} from './types/ProductListUpload';

export const deleteListProductInitialState: ProductListDeleteInterface = {
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
