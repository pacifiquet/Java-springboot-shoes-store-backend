import {inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AuthenticationService} from '../../../services/user/authentication.service';
import {
  authActions,
  registerActions,
  requestNewTokenActions,
  verifyUserActions,
} from './actions';
import {catchError, map, of, switchMap, tap} from 'rxjs';
import {LoginUserResponseInterface} from '../../../types/login.user.response.Interface';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {UserService} from 'src/app/services/user/user.service';
import {BackendSuccessResponseInterface} from 'src/app/types/BackendSuccessResponse.interface';

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

export const registerEffect = createEffect(
  (action$ = inject(Actions), userService = inject(UserService)) => {
    return action$.pipe(
      ofType(registerActions.registerUser),
      switchMap(({request}) => {
        return userService.registerUser(request).pipe(
          map((response: BackendSuccessResponseInterface) => {
            return registerActions.registerSuccess({response});
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              registerActions.registerFailure({error: errorResponse.error})
            );
          })
        );
      })
    );
  },
  {functional: true}
);

export const verifyUserEffect = createEffect(
  (action$ = inject(Actions), userService = inject(UserService)) => {
    return action$.pipe(
      ofType(verifyUserActions.userVerify),
      switchMap(({token}) => {
        return userService.verifyNewAccount(token).pipe(
          map((successResponse: BackendSuccessResponseInterface) => {
            return verifyUserActions.userVerifySuccess({successResponse});
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              verifyUserActions.userVerifyFailed({
                errorResponse: errorResponse.error,
              })
            );
          })
        );
      })
    );
  },
  {functional: true}
);

export const requestNewTokenEffect = createEffect(
  (action$ = inject(Actions), userService = inject(UserService)) => {
    return action$.pipe(
      ofType(requestNewTokenActions.userVerifyNewToken),
      switchMap(({token}) => {
        return userService.requestNewToken(token).pipe(
          map((successResponse: BackendSuccessResponseInterface) => {
            return requestNewTokenActions.userVerifyNewTokenSuccess({
              successResponse,
            });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              requestNewTokenActions.userVerifyNewTokenFailed({
                errorResponse: errorResponse.error,
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