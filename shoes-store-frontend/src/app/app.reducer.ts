import {ActionTypes} from './guest/store/user/actions';
import {requestNewTokenFeature} from './guest/store/user/reducers';
import {
  authFeature,
  registerFeature,
  verifyUserFeature,
} from './guest/store/user/reducers';
import {
  deleteUserFeature,
  userProfileFeature,
  userUpdatedFeature,
} from './profile/store/reducers';

export const {
  name: updateUserFeatureKey,
  reducer: userUpdateReducer,
  selectIsUpdated,
  selectProfileIsLoading,
  selectValidationErrors,
} = userUpdatedFeature;

export const {
  name: userProfileFeatureKey,
  reducer: profileReducer,
  selectIsProfileLoaded,
  selectUserProfile,
  selectProfileError,
} = userProfileFeature;

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsLoading,
  selectIsLogging,
  selectCurrentUser,
  selectIsAuthRegistering,
  selectValidationError,
} = authFeature;

export const {
  name: registerFeatureKey,
  reducer: registerReducer,
  selectRegisterError,
  selectIsRegistering,
  selectRegisterSuccess,
} = registerFeature;

export const {
  name: verifyUserKey,
  reducer: verifyUserReducer,
  selectIsVerified,
  selectFailedVerify,
  selectSuccessVerify,
} = verifyUserFeature;

export const {
  name: requestNewTokenKey,
  reducer: requestNewTokenReducer,
  selectIsNewToken,
  selectNewTokenError,
  selectSuccessNewVerifyToken,
} = requestNewTokenFeature;

export const {
  name: deleteUserFeatureKey,
  reducer: deleteUserReducer,
  selectIsDeleting,
  selectDeleteUserError,
  selectDeleteUserResponse,
} = deleteUserFeature;

export function clearState(reducer: any) {
  return function (state: any, action: any) {
    if (action.type === ActionTypes.LOGOUT) {
      state = undefined;
    }
    return reducer(state, action);
  };
}
