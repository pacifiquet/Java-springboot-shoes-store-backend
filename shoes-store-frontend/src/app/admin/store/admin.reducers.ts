import {
  productDetailsFeature,
  productListDeleteFeature,
  uploadProductListFeature,
} from './reducers';

export const {
  name: deleteProductListKey,
  reducer: deleteListProductRecuder,
  selectIsDeleting,
  selectResponse,
  selectErrors,
} = productListDeleteFeature;

export const {
  name: uploadProductListKey,
  reducer: uploadProductListReducer,
  selectIsUploading,
  selectUploadResponse,
  selectUploadError,
} = uploadProductListFeature;

export const {
  name: productDetailsKey,
  reducer: productDetailsReducer,
  selectProduct,
  selectProductError,
  selectIsLoaded,
} = productDetailsFeature;
