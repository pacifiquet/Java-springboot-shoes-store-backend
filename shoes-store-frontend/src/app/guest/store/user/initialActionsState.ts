import {AuthStateInterface} from 'src/app/types/LoginState.interface';
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
