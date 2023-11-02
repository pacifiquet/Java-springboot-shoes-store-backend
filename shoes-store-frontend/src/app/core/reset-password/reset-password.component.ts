import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  openLoginModal: boolean = false;
  closeResetModal: boolean = true;
  resetPasswordForm: any;

  @Output() resetEvent = new EventEmitter<boolean>();
  @Output() loginEvent = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder) {
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
    console.log(this.resetPasswordForm.value);
  }
}
