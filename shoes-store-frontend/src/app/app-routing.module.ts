import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { AdminComponent } from './admin/admin.component';
import { ProductDetailsComponent } from './core/product-details/product-details.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { Role } from './dto/user/role.enum';
import { NotfoundComponent } from './erros/notfound/notfound.component';
import { UnauthorizedComponent } from './erros/unauthorized/unauthorized.component';
import { AuthGuard } from './guards/auth.guard';
import { AccountVerificationComponent } from './account-verification/account-verification.component';
import { PasswordResetSaveComponent } from './password-reset-save/password-reset-save.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'product-details/:id',
    component: ProductDetailsComponent,
  },
  {
    path: 'user-profile',
    data: { roles: [Role.USER, Role.ADMIN] },
    canActivate: [AuthGuard],
    component: UserProfileComponent,
  },

  {
    path: 'dashboard',
    component: AdminComponent,
    data: { roles: [Role.ADMIN] },
    canActivate: [AuthGuard],
  },
  { path: 'checkout', component: CheckoutPageComponent },
  { path: 'account/verify', component: AccountVerificationComponent },
  { path: 'account/password/reset', component: PasswordResetSaveComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '404', component: NotfoundComponent },
  { path: '401', component: UnauthorizedComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
