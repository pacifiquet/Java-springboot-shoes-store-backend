import {createActionGroup, props} from '@ngrx/store';
import {LoginUserInterace} from '../types/Login.interface';
import {BackendErrorInterface} from '../types/backend.error.interface';
import {LoginUserResponseInterface} from '../types/login.user.response.Interface';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    LoginUser: props<{request: LoginUserInterace}>(),
    'LoginUser success': props<{currentUser: LoginUserResponseInterface}>(),
    'LoginUser failure': props<{errors: BackendErrorInterface}>(),
  },
});
