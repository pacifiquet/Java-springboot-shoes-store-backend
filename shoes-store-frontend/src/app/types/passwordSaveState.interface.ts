import {BackendSuccessResponseInterface} from './BackendSuccessResponse.interface';
import {BackendErrorInterface} from './backend.error.interface';
import {PasswordResetRequest} from '../dto/user/password-reset-request';

export interface PasswordSaveStateInterface {
  isSaved: boolean;
  successSavePasswordResponse:
    | BackendSuccessResponseInterface
    | null
    | undefined;
  errorSavePasswordResponse: BackendErrorInterface | null | undefined;
}
