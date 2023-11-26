import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DeleteModalComponent} from './delete-modal/delete-modal.component';
import {HeaderComponent} from './header/header.component';
import {RouterLink} from '@angular/router';
import {LoginComponent} from '../guest/login/login.component';
import {ResetPasswordComponent} from '../guest/reset-password/reset-password.component';
import {SignupComponent} from '../guest/signup/signup.component';
import {NotificationsComponent} from '../guest/notifications/notifications.component';
import {CartComponent} from '../guest/cart/cart.component';
import {ReactiveFormsModule} from '@angular/forms';
import {PaginationComponent} from '../pagination/pagination.component';

@NgModule({
  declarations: [
    DeleteModalComponent,
    LoginComponent,
    ResetPasswordComponent,
    SignupComponent,
    PaginationComponent,
    NotificationsComponent,
    HeaderComponent,
    CartComponent,
  ],
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  exports: [
    DeleteModalComponent,
    LoginComponent,
    ResetPasswordComponent,
    SignupComponent,
    PaginationComponent,
    NotificationsComponent,
    HeaderComponent,
    CartComponent,
    PaginationComponent,
  ],
})
export class SharedModule {}
