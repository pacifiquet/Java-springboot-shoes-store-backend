import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductDetailsComponent} from './guest/product-details/product-details.component';
import {CheckoutPageComponent} from './guest/checkout-page/checkout-page.component';
import {Role} from './dto/user/role.enum';
import {NotfoundComponent} from './guest/erros/notfound/notfound.component';
import {UnauthorizedComponent} from './guest/erros/unauthorized/unauthorized.component';
import {AuthGuard} from './guards/auth.guard';
import {PasswordResetSaveComponent} from './guest/password-reset-save/password-reset-save.component';
import {AccountVerificationComponent} from './guest/account-verification/account-verification.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./guest/guest.module').then((g) => g.GuestModule),
  },

  {
    path: 'user-profile',
    loadChildren: () =>
      import('./profile/profile.module').then(
        (profile) => profile.ProfileModule
      ),
    data: {roles: [Role.USER, Role.ADMIN]},
    canActivate: [AuthGuard],
  },

  {
    path: 'dashboard',
    loadChildren: () =>
      import('./admin/admin.module').then((admin) => admin.AdminModule),
    data: {roles: [Role.ADMIN]},
    canActivate: [AuthGuard],
  },

  {path: 'checkout', component: CheckoutPageComponent},
  {path: 'account/verify', component: AccountVerificationComponent},
  {path: 'account/password/reset', component: PasswordResetSaveComponent},
  {path: 'product-details/:id', component: ProductDetailsComponent},
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: '404', component: NotfoundComponent},
  {path: '401', component: UnauthorizedComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'}),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
