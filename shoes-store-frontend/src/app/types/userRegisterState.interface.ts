import {BackendSuccessResponseInterface} from './BackendSuccessResponse.interface';
import {BackendErrorInterface} from './backend.error.interface';

export interface UserRegisterStateInterface {
  isRegistering: boolean;
  registerSuccess: BackendSuccessResponseInterface | undefined | null;
  registerError: BackendErrorInterface | undefined | null;
}
