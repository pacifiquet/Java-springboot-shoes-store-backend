import {DeleteUserStateInterface} from 'src/app/types/DeleteUserStateInterface';
import {UserUpdateStateInterface} from '../types/userUpdateState.interface';
import {UserResponseStateInterface} from 'src/app/types/userResponseState.interface';
import {RequestChangePasswordStateInterface} from '../types/requestPasswordChangeState.interface';

export const deleteUserInitialState: DeleteUserStateInterface = {
  isDeleting: false,
  deleteUserResponse: undefined,
  deleteUserError: null,
};

export const updateInitialState: UserUpdateStateInterface = {
  isUpdated: false,
  profileIsLoading: false,
  currentUserProfile: undefined,
  validationErrors: null,
};

export const initialUserProfileState: UserResponseStateInterface = {
  isProfileLoaded: false,
  userProfile: undefined,
  profileError: null,
};

export const initialStateChangePassword: RequestChangePasswordStateInterface = {
  isChangingPassword: false,
  changePasswordResponse: undefined,
  changePasswordError: null,
};
