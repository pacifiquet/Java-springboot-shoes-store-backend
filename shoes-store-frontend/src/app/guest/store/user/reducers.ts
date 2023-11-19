import {createFeature, createReducer, on} from '@ngrx/store';
import {
  authActions,
  registerActions,
  requestNewTokenActions,
  verifyUserActions,
} from './actions';
import {
  authInitialState,
  registerInitialState,
  verifuRequestNewTokenInitialState,
  verifyUserInitialState,
} from './initialActionsState';

export const registerFeature = createFeature({
  name: 'register',
  reducer: createReducer(
    registerInitialState,
    on(registerActions.registerUser, (state) => ({
      ...state,
      isRegistering: true,
    })),
    on(registerActions.registerSuccess, (state, action) => ({
      ...state,
      isRegistering: false,
      registerSuccess: action.response,
    })),
    on(registerActions.registerFailure, (state, action) => ({
      ...state,
      isRegistering: false,
      registerError: action.error,
    }))
  ),
});

export const verifyUserFeature = createFeature({
  name: 'verifyUser',
  reducer: createReducer(
    verifyUserInitialState,
    on(verifyUserActions.userVerify, (state) => ({
      ...state,
      isVerified: false,
    })),
    on(verifyUserActions.userVerifySuccess, (state, action) => ({
      ...state,
      isVerified: true,
      successVerify: action.successResponse,
    })),
    on(verifyUserActions.userVerifyFailed, (state, action) => ({
      ...state,
      isVerified: false,
      failedVerify: action.errorResponse,
    }))
  ),
});

export const requestNewTokenFeature = createFeature({
  name: 'requestNewToken',
  reducer: createReducer(
    verifuRequestNewTokenInitialState,
    on(requestNewTokenActions.userVerifyNewToken, (state) => ({
      ...state,
      isNewToken: false,
    })),
    on(requestNewTokenActions.userVerifyNewTokenSuccess, (state, action) => ({
      ...state,
      isNewToken: true,
      successNewVerifyToken: action.successResponse,
    })),
    on(requestNewTokenActions.userVerifyNewTokenFailed, (state, action) => ({
      ...state,
      isNewToken: false,
      newTokenError: action.errorResponse,
    }))
  ),
});

export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    authInitialState,
    on(authActions.loginUser, (state) => ({
      ...state,
      isLoading: true,
      isLogging: true,
      isAuthRegistering: false,
      validationError: null,
    })),

    on(authActions.loginUserSuccess, (state, action) => ({
      ...state,
      isLogging: false,
      isLoading: false,
      isAuthRegistering: false,
      currentUser: action.currentUser,
    })),

    on(authActions.loginUserFailure, (state, action) => ({
      ...state,
      isLogging: false,
      isLoading: false,
      isAuthRegistering: false,
      validationError: action.errors,
    }))
  ),
});