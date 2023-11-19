import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {UserUpdateInterface} from '../types/userUpdate.interface';
import {UserResponseInterface} from 'src/app/types/userResponse.interface';
import {BackendErrorInterface} from 'src/app/types/backend.error.interface';
import {BackendSuccessResponseInterface} from 'src/app/types/BackendSuccessResponse.interface';

export const updateUserActions = createActionGroup({
  source: 'updateUser',
  events: {
    UpdateUser: props<{request: UserUpdateInterface; id: number}>(),
    'UpdateUser success': props<{userResponse: UserResponseInterface}>(),
    'UpdateUser failure': props<{errorResponse: BackendErrorInterface}>(),
  },
});

export const userProfileActions = createActionGroup({
  source: 'profile',
  events: {
    UserProfile: emptyProps(),
    'UserProfile success': props<{profile: UserResponseInterface}>(),
    'UserProfile failure': props<{errors: BackendErrorInterface}>(),
  },
});

export const deleteUserActions = createActionGroup({
  source: 'userDelete',
  events: {
    DeleteUser: props<{id: number}>(),
    'DeleteUser success': props<{response: BackendSuccessResponseInterface}>(),
    'DeleteUser failure': props<{error: BackendErrorInterface}>(),
  },
});
