import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HeroComponent } from './hero/hero.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NewArrivalComponent } from './new-arrival/new-arrival.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { RecommendedComponent } from './recommended/recommended.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PasswordResetSaveComponent } from './password-reset-save/password-reset-save.component';
import { AccountVerificationComponent } from './account-verification/account-verification.component';
import { GuestRoutingModule } from './guest.routing.module';

@NgModule({
  declarations: [
    HeaderComponent,
    HeroComponent,
    HomeComponent,
    RecommendedComponent,
    NewArrivalComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    CartComponent,
    ProductDetailsComponent,
    NotificationsComponent,
    ResetPasswordComponent,
    PasswordResetSaveComponent,
    AccountVerificationComponent,
  ],
  imports: [CommonModule, RouterModule, FontAwesomeModule, ReactiveFormsModule],
  exports: [
    HeaderComponent,
    HeroComponent,
    HomeComponent,
    RecommendedComponent,
    NewArrivalComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    CartComponent,
    ProductDetailsComponent,
    NotificationsComponent,
    ResetPasswordComponent,
    PasswordResetSaveComponent,
    AccountVerificationComponent,
    GuestRoutingModule,
  ],
})
export class GuestModule {}
