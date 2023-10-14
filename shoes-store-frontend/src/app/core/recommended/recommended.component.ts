import { Component } from '@angular/core';

@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.css'],
})
export class RecommendedComponent {
  openProductModal: boolean = false;

  openProductDetails() {
    this.openProductModal = !this.openProductModal;
  }

  hideProductDetails(event: boolean) {
    this.openProductModal = event;
  }

  productEventFromProductDetails(event: boolean) {
    this.openProductModal = event;
    setTimeout(() => {
      this.openProductModal = !event;
    }, 500);
  }
}
