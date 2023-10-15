import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  openLoginModal: boolean = false;
  openCartModal: boolean = false;
  openSignupModal: boolean = false;
  isLoggedIn: boolean = false;
  isOpenNotifications: boolean = false;

  openNotifications() {
    this.isOpenNotifications = true;
  }

  closeNotificationModal(event: boolean) {
    this.isOpenNotifications = event;
  }
  logoutHadler() {
    this.isLoggedIn = !this.isLoggedIn;
  }

  logoutUser() {
    console.log('logout occured');
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
