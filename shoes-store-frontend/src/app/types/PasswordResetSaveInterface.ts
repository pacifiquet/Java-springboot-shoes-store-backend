import {PasswordResetRequest} from '../dto/user/password-reset-request';

export interface PasswordResetSaveInterface {
  token: string;
  requestBody: PasswordResetRequest;
}
