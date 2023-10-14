import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  openLoginModal: boolean = true;
  closeSignUpModal: boolean = true;

  @Output() registerEvent = new EventEmitter<boolean>();
  @Output() loginEvent = new EventEmitter<boolean>();
  showLoginModal() {
    this.loginEvent.emit(this.closeSignUpModal);
  }

  hideSignUpModal() {
    this.registerEvent.emit(this.closeSignUpModal);
  }
}
