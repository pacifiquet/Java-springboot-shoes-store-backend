import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {AuthenticationService} from '../../services/user/authentication.service';
import {LoginUserResponse} from 'src/app/dto/user/login-user-response';
import {Role} from 'src/app/dto/user/role.enum';
import {Store} from '@ngrx/store';
import {Subject, combineLatest, takeUntil} from 'rxjs';
import {Router} from '@angular/router';
import {
  selectIsRegistering,
  selectProfileError,
  selectUserProfile,
} from '../../app.reducer';
import {Logout, authActions} from 'src/app/guest/store/user/actions';
import {userProfileActions} from 'src/app/profile/store/actions';
import {LoginUserResponseInterface} from '../../types/login.user.response.Interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  openLoginModal: boolean = false;
  openCartModal: boolean = false;
  openSignupModal: boolean = false;
  isLoggedIn: boolean = false;
  isOpenNotifications: boolean = false;
  hideProfileNav: boolean = false;
  openResetPasswordModal: boolean = false;
  profileUser: boolean = false;
  currentUser: LoginUserResponse = new LoginUserResponse();
  unsub$ = new Subject<void>();

  userProfile$ = combineLatest({
    profile: this.store.select(selectUserProfile),
    isRegistering: this.store.select(selectIsRegistering),
    error: this.store.select(selectProfileError),
  });

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private store: Store
  ) {
    if (this.currentUser) {
      this.store.dispatch(userProfileActions.userProfile());
    }
  }
  ngOnInit(): void {
    this.auth.currentUser.pipe(takeUntil(this.unsub$)).subscribe((data) => {
      this.currentUser = data;
    });
    this.userProfile$.pipe(takeUntil(this.unsub$)).subscribe(({error}) => {
      if (error?.error === 'Unauthorized') {
        const userAsString = localStorage.getItem('currentUser');
        let userObject: LoginUserResponseInterface = {};
        if (userAsString) {
          userObject = JSON.parse(userAsString);
        }
        if (userObject.tokens?.refreshToken) {
          this.logoutUser();
          this.store.dispatch(
            authActions.refreshToken({
              request: {token: userObject.tokens?.refreshToken},
            })
          );
        }
      }
    });
  }

  isAdmin() {
    if (this.currentUser?.id !== undefined) {
      this.profileUser = true;
    }
    return this.currentUser?.role === Role.ADMIN;
  }

  isUserLogged() {
    return (
      this.currentUser?.role === Role.ADMIN ||
      this.currentUser?.role === Role.USER
    );
  }

  openNotifications() {
    this.isOpenNotifications = true;
  }

  closeNotificationModal(event: boolean) {
    this.isOpenNotifications = event;
  }

  profileNav() {
    this.hideProfileNav = !this.hideProfileNav;
  }

  logoutUser() {
    this.store.dispatch(new Logout());
    this.auth.logout();
    this.router.navigateByUrl('/home');
    this.hideProfileNav = !this.hideProfileNav;
  }

  login() {
    this.openLoginModal = !this.openLoginModal;
  }

  signup() {
    this.openSignupModal = !this.openSignupModal;
  }

  showCart() {
    this.openCartModal = !this.openCartModal;
  }

  showRegisterModal(event: boolean) {
    this.openLoginModal = event;
    this.openSignupModal = !event;
  }

  showLoginModal(event: boolean) {
    this.openLoginModal = event;
    this.openSignupModal = !event;
  }

  showResetModal(event: boolean) {
    this.openResetPasswordModal = event;
    this.openLoginModal = !event;
  }

  backToLoginEvent(event: boolean) {
    this.openResetPasswordModal = event;
    this.openLoginModal = !event;
  }

  closeResetEvent(event: boolean) {
    this.openResetPasswordModal = event;
  }

  closeRegisterModal(event: boolean) {
    this.openSignupModal = !event;
  }

  closeLoginModal(event: boolean) {
    this.openLoginModal = event;
  }

  closeCartModal(event: boolean) {
    this.openCartModal = event;
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }
}
