import {BackendSuccessResponseInterface} from '../../types/BackendSuccessResponse.interface';
import {BackendErrorInterface} from '../../types/backend.error.interface';

export interface RequestChangePasswordStateInterface {
  isChangingPassword: boolean;
  changePasswordResponse: BackendSuccessResponseInterface | null | undefined;
  changePasswordError: BackendErrorInterface | null | undefined;
}
