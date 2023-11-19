import {BackendSuccessResponseInterface} from './BackendSuccessResponse.interface';
import {BackendErrorInterface} from './backend.error.interface';

export interface PasswordSaveInterface {
  isSaved: boolean;
  savePassword: BackendSuccessResponseInterface | null | undefined;
  errorSavePassword: BackendErrorInterface | null | undefined;
}
