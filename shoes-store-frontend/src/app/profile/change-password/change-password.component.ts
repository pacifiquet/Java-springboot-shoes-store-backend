import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Subject, combineLatest, takeUntil} from 'rxjs';
import {
  selectChangePasswordError,
  selectChangePasswordResponse,
  selectIsChangingPassword,
} from 'src/app/app.reducer';
import {MatchConfirmPassword} from 'src/app/validators/MatchConfirmPassword.validator';
import {requestChangePasswordActions} from '../store/actions';
import {Logout} from 'src/app/guest/store/user/actions';
import {AuthenticationService} from 'src/app/services/user/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordComponent implements OnInit {
  form: any;
  errorMessage: string = '';
  isUpdate: boolean = false;
  unsub$ = new Subject<void>();

  requestChangePassword$ = combineLatest({
    isChangedPassword: this.store.select(selectIsChangingPassword),
    changePasswordSuccess: this.store.select(selectChangePasswordResponse),
    changePasswordErrror: this.store.select(selectChangePasswordError),
  });

  @Output() passwordUpdateEvent = new EventEmitter();
  @Output() successMessageEvent = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private auth: AuthenticationService,
    private router: Router
  ) {
    this.form = fb.group(
      {
        oldPassword: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmNewPassword: ['', Validators.required],
      },
      {
        validator: MatchConfirmPassword.matchingPasswordConfirm(
          'newPassword',
          'confirmNewPassword'
        ),
      }
    );
  }

  get fc() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.requestChangePassword$
      .pipe(takeUntil(this.unsub$))
      .subscribe(({changePasswordSuccess, changePasswordErrror}) => {
        if (changePasswordSuccess?.success) {
          setTimeout(() => {
            this.passwordUpdateEvent.emit(this.isUpdate);
            this.store.dispatch(new Logout());
            this.auth.logout();
            this.router.navigateByUrl('/');
          }, 2000);
        } else if (changePasswordErrror?.message) {
          this.passwordUpdateEvent.emit(!this.isUpdate);
        }
      });
  }

  cancelUpdate() {
    this.passwordUpdateEvent.emit(this.isUpdate);
  }

  onSubmit() {
    const request = this.form.getRawValue();
    console.log(request);
    this.store.dispatch(
      requestChangePasswordActions.requestChangePassword({request})
    );
  }
}
