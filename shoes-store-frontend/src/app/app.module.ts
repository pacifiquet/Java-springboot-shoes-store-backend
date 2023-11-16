import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DeleteModalComponent } from './admin/delete-modal/delete-modal.component';
import { CheckoutPageComponent } from './guest/checkout-page/checkout-page.component';
import { NotfoundComponent } from './guest/erros/notfound/notfound.component';
import { UnauthorizedComponent } from './guest/erros/unauthorized/unauthorized.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './spinner/spinner.component';
import { LoadingInterceptor } from './interceptor/loading.interceptor';
import { Router } from '@angular/router';
import { GuestModule } from './guest/guest.module';
import { ChangePasswordComponent } from './admin/change-password/change-password.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    GuestModule,
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
