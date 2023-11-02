import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatchConfirmPassword } from 'src/app/validators/MatchConfirmPassword.validator';
import { NoSpace } from 'src/app/validators/NoSpace.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  openLoginModal: boolean = true;
  closeSignUpModal: boolean = true;
  passwordMatching!: boolean;
  form: any;
  @Output() registerEvent = new EventEmitter<boolean>();
  @Output() loginEvent = new EventEmitter<boolean>();
  constructor(private fb: FormBuilder) {
    this.form = fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        firstName: ['', [Validators.required, NoSpace.NoSpaceValidation]],
        lastName: ['', [Validators.required, NoSpace.NoSpaceValidation]],
        address: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      {
        validator: MatchConfirmPassword.matchingPasswordConfirm(
          'password',
          'confirmPassword'
        ),
      }
    );
  }

  get fc() {
    return this.form.controls;
  }

  showLoginModal() {
    this.loginEvent.emit(this.closeSignUpModal);
  }

  hideSignUpModal() {
    this.registerEvent.emit(this.closeSignUpModal);
  }

  onSubmit() {
    this.registerEvent.emit(this.closeSignUpModal);
    console.log(this.form);
  }
}
