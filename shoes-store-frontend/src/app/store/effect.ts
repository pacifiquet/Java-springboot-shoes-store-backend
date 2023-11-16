import {inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AuthenticationService} from '../services/user/authentication.service';
import {authActions} from './actions';
import {catchError, map, of, switchMap, tap} from 'rxjs';
import {LoginUserResponseInterface} from '../types/login.user.response.Interface';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

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
