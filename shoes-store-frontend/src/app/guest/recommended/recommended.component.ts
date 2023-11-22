import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import {faStarHalfAlt} from '@fortawesome/free-regular-svg-icons';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import {ProductInterface} from 'src/app/dto/product/product-interface';
import {ProductsService} from 'src/app/services/product/products.service';

@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecommendedComponent implements OnInit {
  openProductModal: boolean = false;
  recommendedList: Array<ProductInterface> = [];
  topTenProduct: Array<ProductInterface> = [];
  average: number = 0;
  star = faStar;
  name = 'recommended';
  haflIcon = faStarHalfAlt;
  constructor(
    private productServie: ProductsService,
    private cdr: ChangeDetectorRef
  ) {
    cdr.markForCheck();
  }
  ngOnInit(): void {
    this.recommendedList = [];
    this.topTenProduct = [];
  }

  getProductReviewAverage(product: ProductInterface) {
    return this.productServie.getProductReviewAverage(product.reviews);
  }
}
