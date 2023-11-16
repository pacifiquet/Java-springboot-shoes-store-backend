import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserRegiserRequest } from 'src/app/dto/user/user-register-request';
import { UserService } from 'src/app/services/user/user.service';
import { MatchConfirmPassword } from 'src/app/validators/MatchConfirmPassword.validator';
import { NoSpace } from 'src/app/validators/NoSpace.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent {
  openLoginModal: boolean = true;
  closeSignUpModal: boolean = true;
  passwordMatching!: boolean;
  form: any;
  registerUser: UserRegiserRequest = new UserRegiserRequest();
  errorMessage: string = '';

  @Output() registerEvent = new EventEmitter<boolean>();
  @Output() loginEvent = new EventEmitter<boolean>();
  constructor(private fb: FormBuilder, private userService: UserService) {
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
    this.registerUser.firstName = this.form.get('firstName').value;
    this.registerUser.lastName = this.form.get('lastName').value;
    this.registerUser.email = this.form.get('email').value;
    this.registerUser.address = this.form.get('address').value;
    this.registerUser.password = this.form.get('password').value;
    this.userService.registerUser(this.registerUser).subscribe(
      (res) => {
        if (res) {
          this.registerEvent.emit(this.closeSignUpModal);
        }
      },
      (error) => {
        if (error) {
          this.errorMessage = error?.error.message;
          this.registerEvent.emit(!this.closeSignUpModal);
        }
      }
    );
    console.log(this.registerUser);
  }
}
