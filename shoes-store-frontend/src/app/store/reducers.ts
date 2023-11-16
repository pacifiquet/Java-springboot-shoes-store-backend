import {createFeature, createReducer, on} from '@ngrx/store';
import {AuthStateInterface} from '../types/LoginState.interface';
import {authActions, logoutActions, userProfileActions} from './actions';
import {UserResponseStateInterface} from '../types/userResponseState.interface';
import {LogoutUserInterface} from '../types/logout.interface';

const initialState: AuthStateInterface = {
  isLoading: false,
  isLogging: true,
  currentUser: undefined,
  validationError: null,
};

const initialUserProfileState: UserResponseStateInterface = {
  isProfileLoaded: false,
  userProfile: undefined,
  profileError: null,
};

const initalUserLogoutState: LogoutUserInterface = {
  isLoggedOut: false,
};

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(authActions.loginUser, (state) => ({
      ...state,
      isLoading: true,
      isLogging: true,
      validationError: null,
    })),

    on(authActions.loginUserSuccess, (state, action) => ({
      ...state,
      isLogging: false,
      isLoading: false,
      currentUser: action.currentUser,
    })),

    on(authActions.loginUserFailure, (state, action) => ({
      ...state,
      isLogging: true,
      isLoading: false,
      validationError: action.errors,
    }))
  ),
});

const userProfileFeature = createFeature({
  name: 'profile',
  reducer: createReducer(
    initialUserProfileState,
    on(userProfileActions.userProfile, (state) => ({
      ...state,
      isProfileLoaded: false,
      validationError: null,
    })),

    on(userProfileActions.userProfileSuccess, (state, action) => ({
      ...state,
      isProfileLoaded: true,
      userProfile: action.profile,
    })),
    on(userProfileActions.userProfileFailure, (state, action) => ({
      ...state,
      isProfileLoaded: false,
      profileError: action.errors,
    }))
  ),
});

const userLogoutFeature = createFeature({
  name: 'logout',
  reducer: createReducer(
    initalUserLogoutState,
    on(logoutActions.logout, (state) => ({
      ...state,
      isLoggedOut: true,
    }))
  ),
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsLoading,
  selectIsLogging,
  selectCurrentUser,
  selectValidationError,
} = authFeature;

export const {
  name: userProfileFeatureKey,
  reducer: profileReducer,
  selectIsProfileLoaded,
  selectUserProfile,
  selectProfileError,
} = userProfileFeature;

export const {
  name: logoutUserKey,
  reducer: userLogout,
  selectIsLoggedOut,
} = userLogoutFeature;
