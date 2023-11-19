import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {UserRegiserRequest} from 'src/app/dto/user/user-register-request';
import {UserService} from 'src/app/services/user/user.service';
import {MatchConfirmPassword} from 'src/app/validators/MatchConfirmPassword.validator';
import {NoSpace} from 'src/app/validators/NoSpace.validator';
import {registerActions} from '../store/user/actions';
import {Subject, combineLatest, takeUntil} from 'rxjs';
import {
  selectRegisterError,
  selectIsRegistering,
  selectRegisterSuccess,
} from '../../app.reducer';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent implements OnInit, OnDestroy {
  openLoginModal: boolean = true;
  closeSignUpModal: boolean = true;
  passwordMatching!: boolean;
  form: any;
  errorMessage: string = '';
  successMessage: string = '';
  $unsub = new Subject<void>();

  data$ = combineLatest({
    isRegistering: this.store.select(selectIsRegistering),
    errors: this.store.select(selectRegisterError),
    registerError: this.store.select(selectRegisterError),
    registerResponse: this.store.select(selectRegisterSuccess),
  });

  @Output() registerEvent = new EventEmitter<boolean>();
  @Output() loginEvent = new EventEmitter<boolean>();
  constructor(private fb: FormBuilder, private store: Store) {
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

  ngOnInit(): void {
    this.data$
      .pipe(takeUntil(this.$unsub))
      .subscribe(({registerError, registerResponse}) => {
        if (registerError) {
          this.successMessage = '';
          this.errorMessage = registerError.message;
          this.registerEvent.emit(!this.closeSignUpModal);
        }
        if (registerResponse) {
          this.errorMessage = '';
          this.successMessage = registerResponse.success;
          setTimeout(() => {
            this.registerEvent.emit(this.closeSignUpModal);
          }, 3000);
        }
      });
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
    this.store.dispatch(
      registerActions.registerUser({request: this.form.getRawValue()})
    );
  }

  ngOnDestroy(): void {
    this.$unsub.next();
    this.$unsub.complete();
  }
}
