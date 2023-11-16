import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutPageComponent {
  checkoutFirstStep: boolean = false;
  checkoutLastStep: boolean = false;
  checkoutStep: string = '';

  checkNextPayment(step: string) {
    this.checkoutLastStep = true;
    this.checkoutFirstStep = true;
    this.checkoutStep = step;
  }

  orderInfo(step: string) {
    this.checkoutStep = step;
    this.checkoutFirstStep = false;
    this.checkoutLastStep = false;
  }
}
