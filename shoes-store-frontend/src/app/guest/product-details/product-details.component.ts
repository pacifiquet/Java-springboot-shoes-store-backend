import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faStarHalfAlt } from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { ProductInterface } from 'src/app/dto/product/product-interface';
import { ProductsService } from 'src/app/services/product/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsComponent implements OnInit {
  product: ProductInterface = {};
  recommendedList: Array<ProductInterface> = [];
  reviewStarHandler: Array<number> = [];
  reviewAverage: number = 0;
  star = faStar;
  haflIcon = faStarHalfAlt;

  constructor(
    private router: ActivatedRoute,
    private productService: ProductsService
  ) {}

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

  ngOnInit(): void {
    this.router.paramMap.subscribe((params) => {
      let id = Number(params.get('id'));
      this.product = this.productService.getProductById(id);
      console.log(this.product);
    });

    this.recommendedList = this.productService
      .getAllProducts()
      .filter((product) => product.id !== 4);

    this.router.paramMap.subscribe((data) => {
      let id = Number(data.get('id'));
      this.reviewStarHandler = this.productService.getReviewIconNumber(
        this.productService.getProductById(id).reviews
      );
    });
  }

  getProductReviewAverage(product: ProductInterface): number {
    this.reviewAverage = this.productService.getProductReviewAverage(
      product.reviews
    );
    return this.reviewAverage;
  }
}
