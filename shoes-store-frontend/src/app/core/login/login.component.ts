import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  showLoginModal: boolean = false;
  resetModal: boolean = false;
  loginForm: any;
  @Output() closeLoginEvent = new EventEmitter<boolean>();
  @Output() openRegisterEvent = new EventEmitter<boolean>();
  @Output() openResetEvent = new EventEmitter<boolean>();
  constructor(private fb: FormBuilder) {
    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get fc() {
    return this.loginForm.controls;
  }

  hideLoginModal() {
    this.closeLoginEvent.emit(this.showLoginModal);
  }

  showRegistersModal() {
    this.openRegisterEvent.emit(this.showLoginModal);
  }

  showResetModal() {
    this.openResetEvent.emit(!this.resetModal);
  }

  onSubmit() {
    console.log(this.loginForm.value);
    this.closeLoginEvent.emit(this.showLoginModal);
  }
}
