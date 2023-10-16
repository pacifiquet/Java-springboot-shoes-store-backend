import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  isCartModalOpen: boolean = true;

  @Output() closeCartEvent = new EventEmitter<boolean>();

  hidecartModal() {
    this.closeCartEvent.emit(!this.isCartModalOpen);
  }

  handleCheckOut() {
    this.closeCartEvent.emit(!this.isCartModalOpen);
  }
}
