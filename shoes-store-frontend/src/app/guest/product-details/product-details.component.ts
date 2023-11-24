import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {faStarHalfAlt} from '@fortawesome/free-regular-svg-icons';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import {Store} from '@ngrx/store';
import {ProductInterface} from 'src/app/dto/product/product-interface';
import {Subject, combineLatest, takeUntil} from 'rxjs';
import {
  productAndRecommendationActions,
  productListActions,
} from '../store/product/actions';
import {
  selectProduct,
  selectProductError,
} from 'src/app/admin/store/admin.reducers';
import {productDetailsActions} from 'src/app/admin/store/actions';
import {
  selectProducAndRecommendation,
  selectProductList,
} from '../store/product/productReducer';

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
  unsub$ = new Subject<void>();
  reviewAverage: number = 0;
  pageSize = 4;
  pageNumber = 0;
  star = faStar;
  haflIcon = faStarHalfAlt;

  products$ = combineLatest({
    data: this.store.select(selectProducAndRecommendation),
    error: this.store.select(selectProductError),
  });

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router
  ) {}

  closeProductDetails: boolean = false;
  addingReview: boolean = false;
  openProductModal: boolean = false;

  addReview() {
    this.addingReview = !this.addingReview;
  }

  productDetails(id: any) {
    if (id) {
      if (id) {
        this.store.dispatch(
          productAndRecommendationActions.productAndRecommendation({
            request: {
              id: Number(id),
              pageSize: this.pageSize,
              pageNumber: this.pageNumber,
            },
          })
        );
      }
      window.scrollTo(0, 0);
    }
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.store.dispatch(
        productAndRecommendationActions.productAndRecommendation({
          request: {
            id: Number(id),
            pageSize: this.pageSize,
            pageNumber: this.pageNumber,
          },
        })
      );
    }

    this.products$.pipe(takeUntil(this.unsub$)).subscribe(({data}) => {
      if (data) {
        this.recommendedList = data.recommendedProducts.content;
        console.log(this.recommendedList);
      }
    });
  }

  getProductReviewAverage(product: ProductInterface): number {
    return this.reviewAverage;
  }
}
