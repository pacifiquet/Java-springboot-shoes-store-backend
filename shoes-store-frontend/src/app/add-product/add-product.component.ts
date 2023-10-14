import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  isModalOpen: boolean = true;

  @Output() addProductModalEvent = new EventEmitter<boolean>();

  closeProductModal() {
    this.addProductModalEvent.emit(this.isModalOpen);
  }
}
