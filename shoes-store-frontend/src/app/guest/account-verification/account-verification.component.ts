import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Subject, combineLatest, takeUntil} from 'rxjs';
import {
  selectFailedVerify,
  selectIsVerified,
  selectNewTokenError,
  selectSuccessNewVerifyToken,
  selectSuccessVerify,
} from 'src/app/app.reducer';
import {requestNewTokenActions, verifyUserActions} from '../store/user/actions';

@Component({
  selector: 'app-account-verification',
  templateUrl: './account-verification.component.html',
  styleUrls: ['./account-verification.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountVerificationComponent implements OnInit, OnDestroy {
  verifyMessage: string = '';
  errorMessage: string = '';
  isVerified: boolean = false;
  requestNewToken: boolean = false;
  unsub$ = new Subject<void>();

  verifyInfo$ = combineLatest({
    verified: this.store.select(selectIsVerified),
    failed: this.store.select(selectFailedVerify),
    response: this.store.select(selectSuccessVerify),
    newTokenResponse: this.store.select(selectSuccessNewVerifyToken),
    newTokenError: this.store.select(selectNewTokenError),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private cdr: ChangeDetectorRef
  ) {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      this.store.dispatch(verifyUserActions.userVerify({token}));
    }
  }

  ngOnInit(): void {
    this.verifyInfo$
      .pipe(takeUntil(this.unsub$))
      .subscribe(({response, newTokenResponse, failed, newTokenError}) => {
        if (response?.success) {
          this.errorMessage = '';
          this.verifyMessage = response.success;
          this.cdr.markForCheck();
          setTimeout(() => {
            this.router.navigateByUrl('/home');
          }, 3000);
        } else if (newTokenResponse?.success) {
          this.errorMessage = '';
          this.verifyMessage = newTokenResponse.success;
          this.cdr.markForCheck();
          setTimeout(() => {
            this.router.navigateByUrl('/home');
          }, 3000);
        } else if (failed?.message) {
          this.verifyMessage = '';
          this.errorMessage = failed.message;
          this.cdr.markForCheck();
        } else if (newTokenError?.message) {
          this.verifyMessage = '';
          this.errorMessage = newTokenError.message;
          this.cdr.markForCheck();
        }
      });
  }

  requestNewTokenHandler() {
    const oldToken = this.route.snapshot.queryParamMap.get('token');
    if (oldToken) {
      this.store.dispatch(
        requestNewTokenActions.userVerifyNewToken({token: oldToken})
      );
    }
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }
}
