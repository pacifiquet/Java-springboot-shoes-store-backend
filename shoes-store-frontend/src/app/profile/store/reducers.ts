import {createFeature, createReducer, on} from '@ngrx/store';
import {
  deleteUserActions,
  requestChangePasswordActions,
  updateUserActions,
  userProfileActions,
} from './actions';
import {
  deleteUserInitialState,
  initialStateChangePassword,
  initialUserProfileState,
  updateInitialState,
} from './initialState';

export const userProfileFeature = createFeature({
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

export const userUpdatedFeature = createFeature({
  name: 'updateUser',
  reducer: createReducer(
    updateInitialState,
    on(updateUserActions.updateUser, (state) => ({
      ...state,
      profileIsLoading: true,
      isUpdated: false,
      validationErrors: null,
    })),
    on(updateUserActions.updateUserSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      isUpdated: true,
      currentUserProfile: action.userResponse,
    })),

    on(updateUserActions.updateUserFailure, (state, action) => ({
      ...state,
      profileIsLoading: false,
      isUpdated: false,
      validationErrors: action.errorResponse,
    }))
  ),
});

export const deleteUserFeature = createFeature({
  name: 'userDelete',
  reducer: createReducer(
    deleteUserInitialState,
    on(deleteUserActions.deleteUser, (state) => ({
      ...state,
      isDeleting: true,
    })),

    on(deleteUserActions.deleteUserSuccess, (state, action) => ({
      ...state,
      isDeleting: false,
      deleteUserResponse: action.response,
    })),

    on(deleteUserActions.deleteUserFailure, (state, action) => ({
      ...state,
      isDeleting: false,
      deleteUserError: action.error,
    }))
  ),
});

export const changePasswordFeature = createFeature({
  name: 'changePassword',
  reducer: createReducer(
    initialStateChangePassword,
    on(requestChangePasswordActions.requestChangePassword, (state) => ({
      ...state,
      isChangingPassword: true,
    })),
    on(
      requestChangePasswordActions.requestChangePasswordSuccess,
      (state, action) => ({
        ...state,
        isChangingPassword: false,
        changePasswordResponse: action.successResponse,
      })
    ),
    on(
      requestChangePasswordActions.requestChangePasswordFailed,
      (state, action) => ({
        ...state,
        isChangingPassword: false,
        changePasswordError: action.errorResponse,
      })
    )
  ),
});
