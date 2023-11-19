import {BackendSuccessResponseInterface} from './BackendSuccessResponse.interface';
import {BackendErrorInterface} from './backend.error.interface';

export interface DeleteUserStateInterface {
  isDeleting: boolean;
  deleteUserResponse: BackendSuccessResponseInterface | undefined | null;
  deleteUserError: BackendErrorInterface | undefined | null;
}
