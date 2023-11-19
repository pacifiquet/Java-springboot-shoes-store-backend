import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './footer/footer.component';
import {HeroComponent} from './hero/hero.component';
import {HomeComponent} from './home/home.component';
import {NewArrivalComponent} from './new-arrival/new-arrival.component';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {RecommendedComponent} from './recommended/recommended.component';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {PasswordResetSaveComponent} from './password-reset-save/password-reset-save.component';
import {AccountVerificationComponent} from './account-verification/account-verification.component';
import {GuestRoutingModule} from './guest.routing.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    HeroComponent,
    HomeComponent,
    RecommendedComponent,
    NewArrivalComponent,
    FooterComponent,
    ProductDetailsComponent,
    PasswordResetSaveComponent,
    AccountVerificationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  exports: [
    HeroComponent,
    HomeComponent,
    RecommendedComponent,
    NewArrivalComponent,
    FooterComponent,
    ProductDetailsComponent,
    PasswordResetSaveComponent,
    AccountVerificationComponent,
    GuestRoutingModule,
  ],
})
export class GuestModule {}
