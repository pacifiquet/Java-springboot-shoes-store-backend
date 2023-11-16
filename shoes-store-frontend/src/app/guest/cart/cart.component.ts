import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
