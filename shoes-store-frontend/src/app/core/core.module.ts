import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HeroComponent } from './hero/hero.component';
import { HomeComponent } from './home/home.component';
import { RecommendedComponent } from './recommended/recommended.component';
import { NewArrivalComponent } from './new-arrival/new-arrival.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CartComponent } from './cart/cart.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReviewStarsComponent } from '../review-stars/review-stars.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular/ionic-module';

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
    ReviewStarsComponent,
  ],
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule, RouterModule],
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
  ],
})
export class CoreModule {}
