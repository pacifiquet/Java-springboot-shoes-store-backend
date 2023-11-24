import {BackendSuccessResponseInterface} from 'src/app/types/BackendSuccessResponse.interface';
import {BackendErrorInterface} from 'src/app/types/backend.error.interface';

export interface ProductListDeleteInterface {
  isDeleting: boolean;
  response: BackendSuccessResponseInterface | undefined | null;
  errors: BackendErrorInterface | undefined | null;
}
