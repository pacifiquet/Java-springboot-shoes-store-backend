import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminComponent} from './admin.component';
import {RouterLink} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {AdminRoutingModule} from './admin.routing.module';
import {AddProductComponent} from './add-product/add-product.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [AdminComponent, AddProductComponent],
  imports: [CommonModule, RouterLink, SharedModule, ReactiveFormsModule],
  exports: [AdminComponent, AddProductComponent, AdminRoutingModule],
})
export class AdminModule {}
