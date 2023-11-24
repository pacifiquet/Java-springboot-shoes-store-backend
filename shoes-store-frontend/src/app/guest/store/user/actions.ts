import {Action, createActionGroup, emptyProps, props} from '@ngrx/store';
import {LoginUserInterace} from '../../../types/Login.interface';
import {BackendErrorInterface} from '../../../types/backend.error.interface';
import {LoginUserResponseInterface} from '../../../types/login.user.response.Interface';
import {UserRegisterInterface} from 'src/app/types/userRegister.interface';
import {BackendSuccessResponseInterface} from 'src/app/types/BackendSuccessResponse.interface';
import {PasswordResetSaveInterface} from 'src/app/types/PasswordResetSaveInterface';

export const registerActions = createActionGroup({
  source: 'register',
  events: {
    RegisterUser: props<{request: UserRegisterInterface}>(),
    'Register success': props<{response: BackendSuccessResponseInterface}>(),
    'Register failure': props<{error: BackendErrorInterface}>(),
  },
});

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    LoginUser: props<{request: LoginUserInterace}>(),
    'LoginUser success': props<{currentUser: LoginUserResponseInterface}>(),
    'LoginUser failure': props<{errors: BackendErrorInterface}>(),
    refreshToken: props<{request: {token: string}}>(),
    'refreshToken success': props<{currentUser: LoginUserResponseInterface}>(),
    'refreshToken failed': props<{errors: BackendErrorInterface}>(),
  },
});

export const verifyUserActions = createActionGroup({
  source: 'verifyUser',
  events: {
    'User Verify': props<{token: string}>(),
    'User Verify Success': props<{
      successResponse: BackendSuccessResponseInterface;
    }>(),
    'User Verify Failed': props<{errorResponse: BackendErrorInterface}>(),
  },
});

export const requestNewTokenActions = createActionGroup({
  source: 'requestNewToken',
  events: {
    UserVerifyNewToken: props<{token: string}>(),
    'UserVerifyNewToken Success': props<{
      successResponse: BackendSuccessResponseInterface;
    }>(),
    'UserVerifyNewToken Failed': props<{
      errorResponse: BackendErrorInterface;
    }>(),
  },
});

export const forgotPasswordActions = createActionGroup({
  source: 'forgotPassword',
  events: {
    forgotPassword: props<{email: string}>(),
    'forgotPassword success': props<{
      successResponse: BackendSuccessResponseInterface;
    }>(),
    'forgotPassword failed': props<{errorResponse: BackendErrorInterface}>(),
  },
});

export const savePasswordActions = createActionGroup({
  source: 'savePassword',
  events: {
    savePassword: props<{
      request: PasswordResetSaveInterface;
    }>(),
    'savePassword success': props<{
      successResponse: BackendSuccessResponseInterface;
    }>(),
    'savePassword failed': props<{errorResponse: BackendErrorInterface}>(),
  },
});

export class ActionTypes {
  static LOGOUT = '[App] logout';
}

export class Logout implements Action {
  readonly type = ActionTypes.LOGOUT;
}
