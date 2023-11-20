import {ActionTypes} from './guest/store/user/actions';
import {
  forgotPasswordFeature,
  requestNewTokenFeature,
  savePasswordFeature,
} from './guest/store/user/reducers';
import {
  authFeature,
  registerFeature,
  verifyUserFeature,
} from './guest/store/user/reducers';
import {
  changePasswordFeature,
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

export const {
  name: requestChangePasswordKey,
  reducer: requestChangePasswordReducer,
  selectChangePasswordError,
  selectChangePasswordResponse,
  selectIsChangingPassword,
} = changePasswordFeature;

export const {
  name: forgotPasswordKey,
  reducer: forgotPasswordReducer,
  selectForgotSuccessResponse,
  selectIsResettingPassword,
  selectForgotPasswordError,
} = forgotPasswordFeature;

export const {
  name: savePasswordKey,
  reducer: savePasswordReducer,
  selectIsSaved,
  selectErrorSavePasswordResponse,
  selectSuccessSavePasswordResponse,
} = savePasswordFeature;

export function clearState(reducer: any) {
  return function (state: any, action: any) {
    if (action.type === ActionTypes.LOGOUT) {
      state = undefined;
    }
    return reducer(state, action);
  };
}
