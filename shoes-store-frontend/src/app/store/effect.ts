import {inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AuthenticationService} from '../services/user/authentication.service';
import {authActions, logoutActions, userProfileActions} from './actions';
import {catchError, map, of, switchMap, tap} from 'rxjs';
import {LoginUserResponseInterface} from '../types/login.user.response.Interface';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {UserService} from '../services/user/user.service';
import {UserResponseInterface} from '../types/userResponse.interface';

export const loginEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthenticationService)) => {
    return actions$.pipe(
      ofType(authActions.loginUser),
      switchMap(({request}) => {
        return authService.login(request).pipe(
          map((currentUser: LoginUserResponseInterface) => {
            return authActions.loginUserSuccess({currentUser});
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              authActions.loginUserFailure({
                errors: errorResponse.error,
              })
            );
          })
        );
      })
    );
  },
  {functional: true}
);

export const redirectAfterLogin = createEffect(
  (action$ = inject(Actions), router = inject(Router)) => {
    return action$.pipe(
      ofType(authActions.loginUserSuccess),
      tap(() => {
        router.navigateByUrl('/user-profile');
      })
    );
  },
  {functional: true, dispatch: false}
);

export const userProfileEffect = createEffect(
  (action$ = inject(Actions), userService = inject(UserService)) => {
    return action$.pipe(
      ofType(userProfileActions.userProfile),
      switchMap(() => {
        return userService.getUserProfile().pipe(
          map((profile: UserResponseInterface) => {
            return userProfileActions.userProfileSuccess({profile});
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              userProfileActions.userProfileFailure({
                errors: errorResponse.error,
              })
            );
          })
        );
      })
    );
  },
  {functional: true}
);

export const logoutEffect = createEffect(
  (
    action$ = inject(Actions),
    auth = inject(AuthenticationService),
    router = inject(Router)
  ) => {
    return action$.pipe(
      ofType(logoutActions.logout),
      tap(() => {
        auth.logout();
        router.navigateByUrl('/');
        window.location.reload();
      })
    );
  },
  {functional: true, dispatch: false}
);
