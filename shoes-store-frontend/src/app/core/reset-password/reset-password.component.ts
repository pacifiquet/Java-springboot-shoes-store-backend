import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  openLoginModal: boolean = false;
  closeResetModal: boolean = true;

  @Output() resetEvent = new EventEmitter<boolean>();
  @Output() loginEvent = new EventEmitter<boolean>();

  closeResetForm() {
    this.resetEvent.emit(!this.closeResetModal);
  }

  backToLogin() {
    this.loginEvent.emit(!this.closeResetModal);
  }

  gobackToLoginModal() {
    this.openLoginModal = true;
  }
}
