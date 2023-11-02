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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
