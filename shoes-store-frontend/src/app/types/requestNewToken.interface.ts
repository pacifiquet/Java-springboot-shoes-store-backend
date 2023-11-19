import {BackendSuccessResponseInterface} from './BackendSuccessResponse.interface';
import {BackendErrorInterface} from './backend.error.interface';

export interface RequestNewTokenInterfaceState {
  isNewToken: boolean;
  successNewVerifyToken: BackendSuccessResponseInterface | undefined | null;
  newTokenError: BackendErrorInterface | undefined | null;
}
