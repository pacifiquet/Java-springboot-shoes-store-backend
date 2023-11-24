import {BackendSuccessResponseInterface} from 'src/app/types/BackendSuccessResponse.interface';
import {BackendErrorInterface} from 'src/app/types/backend.error.interface';

export interface ProductListUpload {
  products: File;
}

export interface ProductListUploadState {
  isUploading: boolean;
  uploadResponse: BackendSuccessResponseInterface | null | undefined;
  uploadError: BackendErrorInterface | null | undefined;
}
