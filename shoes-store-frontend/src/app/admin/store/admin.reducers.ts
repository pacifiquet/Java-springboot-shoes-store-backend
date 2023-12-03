import {deleteProductFeature, updateProductFeature} from './reducers';
import {
  addProductFeature,
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

export const {
  name: addProductKey,
  reducer: addProductReducer,
  selectAddProductErrors,
  selectAddProductResponse,
  selectIsAddingProduct,
} = addProductFeature;

export const {
  name: deleteProductKey,
  reducer: deleteProductReducer,
  selectDeleteProductresponse,
  selectDeleteProducterror,
  selectIsSingleProductDelete,
} = deleteProductFeature;

export const {
  name: updateProductKey,
  reducer: updateProductReduder,
  selectIsUpdatingProduct,
  selectUpdateProductError,
  selectUpdateProductResponse,
} = updateProductFeature;
