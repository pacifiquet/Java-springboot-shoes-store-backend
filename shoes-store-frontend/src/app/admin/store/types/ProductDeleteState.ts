import {BackendSuccessResponseInterface} from 'src/app/types/BackendSuccessResponse.interface';
import {BackendErrorInterface} from 'src/app/types/backend.error.interface';

export interface ProductListDeleteInterface {
  isDeleting: boolean;
  response: BackendSuccessResponseInterface | undefined | null;
  errors: BackendErrorInterface | undefined | null;
}

export interface AddProductInterface {
  isAddingProduct: boolean;
  addProductResponse: BackendSuccessResponseInterface | undefined | null;
  addProductErrors: BackendErrorInterface | undefined | null;
}

export interface ProductDeleteInterface {
  isSingleProductDelete: boolean;
  deleteProductresponse: BackendSuccessResponseInterface | undefined | null;
  deleteProducterror: BackendErrorInterface | undefined | null;
}

export interface ProductUpdateInterface {
  isUpdatingProduct: boolean;
  updateProductResponse: BackendSuccessResponseInterface | undefined | null;
  updateProductError: BackendErrorInterface | null | undefined;
}
