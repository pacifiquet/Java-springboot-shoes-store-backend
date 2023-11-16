import {createFeature, createReducer, on} from '@ngrx/store';
import {AuthStateInterface} from '../types/LoginState.interface';
import {authActions} from './actions';

const initialState: AuthStateInterface = {
  isLoading: false,
  isSubmitting: false,
  currentUser: undefined,
  validationError: null,
};

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(authActions.loginUser, (state) => ({
      ...state,
      isLoading: true,
      isSubmitting: true,
      validationError: null,
    })),

    on(authActions.loginUserSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      isLoading: false,
      currentUser: action.currentUser,
    })),

    on(authActions.loginUserFailure, (state, action) => ({
      ...state,
      isSubmitting: true,
      isLoading: false,
      validationError: action.errors,
    }))
  ),
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsLoading,
  selectIsSubmitting,
  selectCurrentUser,
  selectValidationError,
} = authFeature;
