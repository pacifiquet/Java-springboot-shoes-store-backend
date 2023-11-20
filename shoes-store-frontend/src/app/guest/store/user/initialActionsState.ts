import {AuthStateInterface} from 'src/app/types/LoginState.interface';
import {ForgotPasswordInterface} from 'src/app/types/forgotPasswordState.interface';
import {PasswordSaveStateInterface} from 'src/app/types/passwordSaveState.interface';
import {RequestNewTokenInterfaceState} from 'src/app/types/requestNewToken.interface';
import {UserRegisterStateInterface} from 'src/app/types/userRegisterState.interface';
import {UserVerifyStateInterface} from 'src/app/types/userVerifyState.interface';

export const authInitialState: AuthStateInterface = {
  isLoading: false,
  isLogging: true,
  isAuthRegistering: true,
  currentUser: undefined,
  validationError: null,
};

export const registerInitialState: UserRegisterStateInterface = {
  isRegistering: false,
  registerSuccess: undefined,
  registerError: null,
};

export const verifyUserInitialState: UserVerifyStateInterface = {
  isVerified: false,
  successVerify: undefined,
  failedVerify: null,
};

export const verifuRequestNewTokenInitialState: RequestNewTokenInterfaceState =
  {
    isNewToken: false,
    successNewVerifyToken: null,
    newTokenError: null,
  };

export const initalStateForgotPassword: ForgotPasswordInterface = {
  isResettingPassword: false,
  forgotSuccessResponse: undefined,
  forgotPasswordError: null,
};

export const initialStateSavePassword: PasswordSaveStateInterface = {
  isSaved: false,
  successSavePasswordResponse: undefined,
  errorSavePasswordResponse: null,
};
