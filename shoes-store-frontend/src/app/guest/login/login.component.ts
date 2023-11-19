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
import {LoginUserRequest} from 'src/app/dto/user/login-user';
import {AuthenticationService} from '../../services/user/authentication.service';
import {Router} from '@angular/router';
import {LoaderService} from '../../services/loader.service';
import {Subject, combineLatest, takeUntil} from 'rxjs';
import {Store} from '@ngrx/store';
import {LoginUserInterace} from 'src/app/types/Login.interface';
import {authActions} from '../store/user/actions';
import {
  selectCurrentUser,
  selectIsLoading,
  selectIsLogging,
  selectValidationError,
} from '../../app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {
  showLoginModal: boolean = false;
  resetModal: boolean = false;
  loginForm: any;
  errorMessage: string = '';
  user: LoginUserRequest = new LoginUserRequest();
  unsub$ = new Subject<void>();

  $data = combineLatest({
    isLogging: this.store.select(selectIsLogging),
    isLoading: this.store.select(selectIsLoading),
    errors: this.store.select(selectValidationError),
    currentUser: this.store.select(selectCurrentUser),
  });

  @Output() closeLoginEvent = new EventEmitter<boolean>();
  @Output() openRegisterEvent = new EventEmitter<boolean>();
  @Output() openResetEvent = new EventEmitter<boolean>();
  @Input() showLogin: boolean = false;

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
  }

  get fc() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.$data
      .pipe(takeUntil(this.unsub$))
      .subscribe(({errors, currentUser}) => {
        if (errors) {
          this.errorMessage = errors.message;
        }
        if (currentUser?.id) {
          this.closeLoginEvent.emit(this.showLoginModal);
        }
      });
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
  }
  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }
}
