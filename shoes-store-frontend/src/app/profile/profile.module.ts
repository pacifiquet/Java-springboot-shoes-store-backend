import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {ProfileRoutingModule} from './profile.routing.module';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [UserProfileComponent, ChangePasswordComponent],
  imports: [CommonModule, HttpClientModule, SharedModule, ReactiveFormsModule],
  exports: [
    ProfileRoutingModule,
    UserProfileComponent,
    ChangePasswordComponent,
  ],
})
export class ProfileModule {}
