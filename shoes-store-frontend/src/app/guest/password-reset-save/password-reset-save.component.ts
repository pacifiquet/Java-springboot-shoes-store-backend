import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {PasswordResetRequest} from 'src/app/dto/user/password-reset-request';
import {MatchConfirmPassword} from 'src/app/validators/MatchConfirmPassword.validator';
import {savePasswordActions} from '../store/user/actions';
import {Subject, combineLatest, takeUntil} from 'rxjs';
import {
  selectErrorSavePasswordResponse,
  selectSuccessSavePasswordResponse,
} from 'src/app/app.reducer';

@Component({
  selector: 'app-password-reset-save',
  templateUrl: './password-reset-save.component.html',
  styleUrls: ['./password-reset-save.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordResetSaveComponent implements OnInit, OnDestroy {
  form: any;
  message: string = '';
  isSuccess: boolean = false;
  isError: boolean = false;
  requestNewToken: boolean = false;
  hideRequestNewTokenFrom: boolean = false;
  unsub$ = new Subject<void>();
  savePasswordInfo$ = combineLatest({
    successSavedResponse: this.store.select(selectSuccessSavePasswordResponse),
    errorResponse: this.store.select(selectErrorSavePasswordResponse),
  });

  @Output() requestNewTokenFormEvent = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
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
    this.savePasswordInfo$
      .pipe(takeUntil(this.unsub$))
      .subscribe(({successSavedResponse, errorResponse}) => {
        if (successSavedResponse?.success) {
          this.message = successSavedResponse.success;
          this.isSuccess = true;
          this.isError = false;
          this.cdr.markForCheck();
          setTimeout(() => {
            this.router.navigateByUrl('/home');
          }, 3000);
        } else if (errorResponse?.message) {
          this.message = errorResponse.message;
          this.isSuccess = false;
          this.isError = true;
          this.cdr.markForCheck();
        }
      });
  }

  get fc() {
    return this.form.controls;
  }

  hideResetEvent(event: boolean) {
    this.requestNewToken = false;
  }

  requestNewTokenHandler() {
    this.requestNewToken = true;
    this.requestNewTokenFormEvent.emit(this.hideRequestNewTokenFrom);
  }

  onSubmit() {
    const tokenRequest = this.route.snapshot.queryParamMap.get('token');
    const passwordRequest = new PasswordResetRequest(
      this.form.get('password').value
    );

    if (tokenRequest) {
      this.store.dispatch(
        savePasswordActions.savePassword({
          request: {token: tokenRequest, requestBody: passwordRequest},
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }
}
