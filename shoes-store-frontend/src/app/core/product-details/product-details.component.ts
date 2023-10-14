import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  closeProductDetails: boolean = false;
  addingReview: boolean = false;

  openProductModal: boolean = false;

  @Output() productDetailsEvent = new EventEmitter<boolean>();
  @Output() productEvent = new EventEmitter<boolean>();
  hideProductModal() {
    this.productDetailsEvent.emit(this.closeProductDetails);
  }

  openModalProduct() {
    this.productEvent.emit(this.closeProductDetails);
  }

  addReview() {
    this.addingReview = !this.addingReview;
  }
}
