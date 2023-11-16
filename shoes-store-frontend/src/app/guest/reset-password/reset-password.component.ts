import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordComponent {
  openLoginModal: boolean = false;
  closeResetModal: boolean = true;
  isSuccess: boolean = false;
  isError: boolean = false;
  resetPasswordForm: any;
  message: string = '';

  @Output() resetEvent = new EventEmitter<boolean>();
  @Output() loginEvent = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.resetPasswordForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
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
      this.userService.forgotPassword(email).subscribe(
        (response) => {
          if (response.success) {
            this.isSuccess = true;
            this.message = response.success;
            setTimeout(() => {
              this.resetEvent.emit(!this.closeResetModal);
            }, 3000);
          }
        },
        (error) => {
          if (error) {
            this.message = error?.error?.message;
            this.isError = true;
          }
        }
      );
    }
    console.log(this.resetPasswordForm.value);
  }
}
