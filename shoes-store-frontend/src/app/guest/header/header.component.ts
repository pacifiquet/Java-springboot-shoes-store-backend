import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/user/authentication.service';
import {LoginUserResponse} from 'src/app/dto/user/login-user-response';
import {Role} from 'src/app/dto/user/role.enum';
import {Store} from '@ngrx/store';
import {combineLatest} from 'rxjs';
import {selectIsProfileLoaded, selectUserProfile} from 'src/app/store/reducers';
import {Router} from '@angular/router';
import {logoutActions} from 'src/app/store/actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  openLoginModal: boolean = false;
  openCartModal: boolean = false;
  openSignupModal: boolean = false;
  isLoggedIn: boolean = false;
  isOpenNotifications: boolean = false;
  hideProfileNav: boolean = false;
  openResetPasswordModal: boolean = false;
  profileUser: boolean = false;
  currentUser: LoginUserResponse = new LoginUserResponse();
  href: string = '';
  userProfile$ = combineLatest({
    profile: this.store.select(selectUserProfile),
    isLogged: this.store.select(selectIsProfileLoaded),
  });

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private store: Store
  ) {}
  ngOnInit(): void {}

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
    this.store.dispatch(logoutActions.logout());
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
}
