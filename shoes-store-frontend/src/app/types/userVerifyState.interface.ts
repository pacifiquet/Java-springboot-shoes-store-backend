import {BackendSuccessResponseInterface} from './BackendSuccessResponse.interface';
import {BackendErrorInterface} from './backend.error.interface';

export interface UserVerifyStateInterface {
  isVerified: boolean;
  successVerify: BackendSuccessResponseInterface | undefined | null;
  failedVerify: BackendErrorInterface | undefined | null;
}
