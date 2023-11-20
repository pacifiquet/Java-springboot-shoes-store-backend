import {inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {UserService} from 'src/app/services/user/user.service';
import {
  deleteUserActions,
  requestChangePasswordActions,
  updateUserActions,
  userProfileActions,
} from './actions';
import {catchError, map, of, switchMap} from 'rxjs';
import {UserResponseInterface} from 'src/app/types/userResponse.interface';
import {HttpErrorResponse} from '@angular/common/http';
import {BackendSuccessResponseInterface} from 'src/app/types/BackendSuccessResponse.interface';
import {AuthenticationService} from 'src/app/services/user/authentication.service';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Logout} from 'src/app/guest/store/user/actions';

export const userUpdateEffect = createEffect(
  (action$ = inject(Actions), userService = inject(UserService)) => {
    return action$.pipe(
      ofType(updateUserActions.updateUser),
      switchMap(({request, id}) => {
        return userService
          .updateUser(request.profile, JSON.stringify(request.userInfo), id)
          .pipe(
            map((profile: UserResponseInterface) => {
              return userProfileActions.userProfileSuccess({profile});
            }),
            catchError((errorResponse: HttpErrorResponse) => {
              return of(
                updateUserActions.updateUserFailure({
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

export const deleteUserEffect = createEffect(
  (
    action$ = inject(Actions),
    userService = inject(UserService),
    auth = inject(AuthenticationService),
    router = inject(Router),
    store = inject(Store)
  ) => {
    return action$.pipe(
      ofType(deleteUserActions.deleteUser),
      switchMap(({id}) => {
        return userService.deleteUser(id).pipe(
          map((response: BackendSuccessResponseInterface) => {
            store.dispatch(new Logout());
            auth.logout();
            router.navigateByUrl('/home');
            return deleteUserActions.deleteUserSuccess({response});
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              deleteUserActions.deleteUserFailure({error: errorResponse.error})
            );
          })
        );
      })
    );
  },
  {functional: true}
);

export const changePasswordEffect = createEffect(
  (action$ = inject(Actions), userService = inject(UserService)) => {
    return action$.pipe(
      ofType(requestChangePasswordActions.requestChangePassword),
      switchMap(({request}) => {
        return userService.changePassword(request).pipe(
          map((successResponse: BackendSuccessResponseInterface) =>
            requestChangePasswordActions.requestChangePasswordSuccess({
              successResponse,
            })
          ),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              requestChangePasswordActions.requestChangePasswordFailed({
                errorResponse: errorResponse.error,
              })
            )
          )
        );
      })
    );
  },
  {functional: true}
);
