import {NgModule} from '@angular/core';
import {RouterModule, Route} from '@angular/router';
import {UserProfileComponent} from './user-profile/user-profile.component';

const routes: Route[] = [
  {
    path: '',
    component: UserProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
