import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/user/authentication.service';
import { LoginUserResponse } from 'src/app/dto/user/login-user-response';
import { Role } from 'src/app/dto/user/role.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { UserResponse } from 'src/app/dto/user/user-response';
import { UserService } from 'src/app/services/user/user.service';

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
  nologgedInUser = true;
  currentUser: LoginUserResponse = new LoginUserResponse();
  userProfile: UserResponse = new UserResponse();
  href: string = '';

  constructor(
    private auth: AuthenticationService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    auth.currentUser.subscribe((user) => {
      this.currentUser = user;
    });

    if (this.currentUser?.id !== undefined) {
      this.userService
        .getUserById(Number(this.currentUser.id))
        .subscribe((user) => {
          if (user) {
            this.userProfile = user;
          }
        });
    }
  }
  ngOnInit(): void {
    this.href = this.router.url;
    console.log(this.router.url);
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
    this.hideProfileNav = !this.hideProfileNav;
    this.profileUser = false;
    this.auth.logout();
    this.router.navigate(['/home']);
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
