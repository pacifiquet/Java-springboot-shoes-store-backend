import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {LoginUserRequest} from 'src/app/dto/user/login-user';
import {AuthenticationService} from '../../services/user/authentication.service';
import {Router} from '@angular/router';
import {LoaderService} from '../../services/loader.service';
import {combineLatest} from 'rxjs';
import {Store} from '@ngrx/store';
import {
  selectIsLoading,
  selectIsLogging,
  selectValidationError,
} from 'src/app/store/reducers';
import {LoginUserInterace} from 'src/app/types/Login.interface';
import {authActions} from 'src/app/store/actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  showLoginModal: boolean = false;
  resetModal: boolean = false;
  loginForm: any;
  errorMessage: string = '';
  user: LoginUserRequest = new LoginUserRequest();

  $data = combineLatest({
    isLogging: this.store.select(selectIsLogging),
    isLoading: this.store.select(selectIsLoading),
    errors: this.store.select(selectValidationError),
  });

  @Output() closeLoginEvent = new EventEmitter<boolean>();
  @Output() openRegisterEvent = new EventEmitter<boolean>();
  @Output() openResetEvent = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private router: Router,
    private loading: LoaderService,
    private store: Store
  ) {
    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });

    this.$data.subscribe((data) => {
      console.log(data);
    });
  }

  get fc() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    if (this.auth.currentUserValue?.id) {
      this.router.navigate(['/user-profile']);
      return;
    }
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
    const loginRequest: LoginUserInterace = this.loginForm.getRawValue();
    this.store.dispatch(authActions.loginUser({request: loginRequest}));

    // this.user.email = this.loginForm.get('email').value
    // this.user.password = this.loginForm.get('password').value
    // this.auth.login(this.user).subscribe(
    //   (data) => {
    //     if (data) {
    //       this.router.navigate(['/user-profile'])
    //       this.closeLoginEvent.emit(this.showLoginModal)
    //     }
    //   },
    //   (error) => {
    //     this.errorMessage = error.error?.message
    //     this.closeLoginEvent.emit(!this.showLoginModal)
    //   }
    // )
  }
}
