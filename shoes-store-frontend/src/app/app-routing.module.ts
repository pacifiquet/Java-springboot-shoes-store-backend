import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },

  { path: 'dashboard', component: AdminComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
