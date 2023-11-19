import {BackendSuccessResponseInterface} from './BackendSuccessResponse.interface';
import {BackendErrorInterface} from './backend.error.interface';

export interface ForgotPasswordInterface {
  isResettingPassword: boolean;
  forgotSuccessResponse: BackendSuccessResponseInterface | undefined | null;
  forgotPasswordError: BackendErrorInterface | null | undefined;
}
