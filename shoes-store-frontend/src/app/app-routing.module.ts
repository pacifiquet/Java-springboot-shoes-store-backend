import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ProductDetailsComponent } from './guest/product-details/product-details.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CheckoutPageComponent } from './guest/checkout-page/checkout-page.component';
import { Role } from './dto/user/role.enum';
import { NotfoundComponent } from './guest/erros/notfound/notfound.component';
import { UnauthorizedComponent } from './guest/erros/unauthorized/unauthorized.component';
import { AuthGuard } from './guards/auth.guard';
import { PasswordResetSaveComponent } from './guest/password-reset-save/password-reset-save.component';
import { AccountVerificationComponent } from './guest/account-verification/account-verification.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./guest/guest.module').then((g) => g.GuestModule),
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
