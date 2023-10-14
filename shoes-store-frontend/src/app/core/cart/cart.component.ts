import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  hideCartModal: boolean = true;

  @Output() closeCartEvent = new EventEmitter<boolean>();

  hidecartModal() {
    this.closeCartEvent.emit(!this.hideCartModal);
  }
}
