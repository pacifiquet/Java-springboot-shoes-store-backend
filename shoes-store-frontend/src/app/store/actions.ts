import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {LoginUserInterace} from '../types/Login.interface';
import {BackendErrorInterface} from '../types/backend.error.interface';
import {LoginUserResponseInterface} from '../types/login.user.response.Interface';
import {UserResponseInterface} from '../types/userResponse.interface';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    LoginUser: props<{request: LoginUserInterace}>(),
    'LoginUser success': props<{currentUser: LoginUserResponseInterface}>(),
    'LoginUser failure': props<{errors: BackendErrorInterface}>(),
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

export const logoutActions = createActionGroup({
  source: 'logout',
  events: {
    Logout: emptyProps(),
  },
});
