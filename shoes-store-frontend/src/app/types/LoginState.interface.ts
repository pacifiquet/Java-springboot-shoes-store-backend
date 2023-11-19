import {LoginUserResponse} from '../dto/user/login-user-response';
import {BackendErrorInterface} from './backend.error.interface';

export interface AuthStateInterface {
  isLogging: boolean;
  isAuthRegistering: boolean;
  currentUser: LoginUserResponse | null | undefined;
  isLoading: boolean;
  validationError: BackendErrorInterface | null | undefined;
}
