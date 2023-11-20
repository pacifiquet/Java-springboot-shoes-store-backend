import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Subject, combineLatest, takeUntil} from 'rxjs';
import {
  selectForgotPasswordError,
  selectForgotSuccessResponse,
  selectIsResettingPassword,
} from 'src/app/app.reducer';
import {UserService} from 'src/app/services/user/user.service';
import {forgotPasswordActions} from '../store/user/actions';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  openLoginModal: boolean = false;
  closeResetModal: boolean = true;
  isSuccess: boolean = false;
  isError: boolean = false;
  resetPasswordForm: any;
  message: string = '';
  unsub$ = new Subject<void>();

  resetPasswordInfo$ = combineLatest({
    isReset: this.store.select(selectIsResettingPassword),
    successResponse: this.store.select(selectForgotSuccessResponse),
    errorResponse: this.store.select(selectForgotPasswordError),
  });

  @Output() resetEvent = new EventEmitter<boolean>();
  @Output() loginEvent = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private cdr: ChangeDetectorRef
  ) {
    this.resetPasswordForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  ngOnInit(): void {
    this.resetPasswordInfo$
      .pipe(takeUntil(this.unsub$))
      .subscribe(({successResponse, errorResponse}) => {
        if (successResponse?.success) {
          this.isError = false;
          this.isSuccess = true;
          this.message = successResponse.success;
          this.cdr.markForCheck();
          setTimeout(() => {
            this.resetEvent.emit(!this.closeResetModal);
          }, 3000);
        } else if (errorResponse?.message) {
          this.message = errorResponse.message;
          this.isError = true;
          this.isSuccess = false;
          this.cdr.markForCheck();
        }
      });
  }

  get Email() {
    return this.resetPasswordForm.get('email');
  }

  closeResetForm() {
    this.resetEvent.emit(!this.closeResetModal);
  }

  backToLogin() {
    this.loginEvent.emit(!this.closeResetModal);
  }

  gobackToLoginModal() {
    this.openLoginModal = true;
  }

  onSubmit() {
    const email = this.resetPasswordForm.get('email').value;
    if (email) {
      this.store.dispatch(forgotPasswordActions.forgotPassword({email}));
    }
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }
}
