import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AdminComponent } from './admin/admin.component';
import { AddProductComponent } from './add-product/add-product.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { NotfoundComponent } from './erros/notfound/notfound.component';
import { UnauthorizedComponent } from './erros/unauthorized/unauthorized.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './spinner/spinner.component';
import { LoadingInterceptor } from './interceptor/loading.interceptor';
import { Router } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AccountVerificationComponent } from './account-verification/account-verification.component';
import { PasswordResetSaveComponent } from './password-reset-save/password-reset-save.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AddProductComponent,
    UserProfileComponent,
    DeleteModalComponent,
    CheckoutPageComponent,
    NotfoundComponent,
    UnauthorizedComponent,
    SpinnerComponent,
    ChangePasswordComponent,
    AccountVerificationComponent,
    PasswordResetSaveComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    CoreModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private router: Router) {
    this.router.errorHandler = (error: any) => {
      this.router.navigate(['/404']);
    };
  }
}
