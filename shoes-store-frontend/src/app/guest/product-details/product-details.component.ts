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
import {Subject, combineLatest, takeUntil} from 'rxjs';
import {productAndRecommendationActions} from '../store/product/actions';
import {selectProductError} from 'src/app/admin/store/admin.reducers';
import {selectProducAndRecommendation} from '../store/product/productReducer';
import {ProductInterface} from '../store/product/types/ProductInterface';
import {selectUserProfile} from 'src/app/app.reducer';

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
  currentPage = 1;
  pageSize = 4;
  productId = 0;
  pageNumber = 0;
  star = faStar;
  haflIcon = faStarHalfAlt;

  products$ = combineLatest({
    data: this.store.select(selectProducAndRecommendation),
    error: this.store.select(selectProductError),
    user: this.store.select(selectUserProfile),
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
    this.productId = id;
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
        this.recommendedList = data.recommendedProducts.content.filter(
          (pr) => pr.id !== Number(this.route.snapshot.paramMap.get('id'))
        );
      }
    });
  }

  getProductReviewAverage(product: ProductInterface): number {
    return this.reviewAverage;
  }

  nextProductsByPage(id: any) {
    this.pageNumber += 1;
    this.currentPage += 1;

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

  prevProductsByPage(id: any) {
    this.pageNumber -= 1;
    this.currentPage -= 1;
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
}
