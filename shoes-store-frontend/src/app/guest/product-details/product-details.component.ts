import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {faStarHalfAlt} from '@fortawesome/free-regular-svg-icons';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import {Store} from '@ngrx/store';
import {Observable, Subject, combineLatest} from 'rxjs';
import {
  selectProduct,
  selectProductError,
} from 'src/app/admin/store/admin.reducers';
import {
  ProductInterface,
  RecommndedProductResponse,
  ReviewResponse,
} from '../store/product/types/ProductInterface';
import {selectUserProfile} from 'src/app/app.reducer';
import {ProductsService} from 'src/app/services/product/products.service';
import {productDetailsActions} from 'src/app/admin/store/actions';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product: ProductInterface = {};
  recommendedList: Array<ProductInterface> = [];
  reviewStarHandler: Array<number> = [];
  unsub$ = new Subject<void>();
  reviewAverage: number = 0;
  productCurrentPage = 1;
  productPageSize = 3;
  reviewPageSize = 3;
  reviewCurrentPage = 1;
  reviewPageNumber = 0;
  productId = 0;
  productPageNumber = 0;
  rating: number = 0;
  hoveredIndex: number = 3;
  star = faStar;
  haflIcon = faStarHalfAlt;
  form: any;
  closeProductDetails: boolean = false;
  addingReview: boolean = false;
  openProductModal: boolean = false;
  userRating: number = 0;

  value = 2.5; //addition of .5
  starList: string[] = [];
  isNewReview = false;

  productReviews$: Observable<ReviewResponse> = new Subject<ReviewResponse>();
  productRecommendation$: Observable<RecommndedProductResponse> =
    new Subject<RecommndedProductResponse>();

  products$ = combineLatest({
    data: this.store.select(selectProduct),
    error: this.store.select(selectProductError),
    user: this.store.select(selectUserProfile),
  });

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router,
    private productService: ProductsService,
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      comment: ['', Validators.required],
    });
  }

  addReview() {
    this.addingReview = !this.addingReview;
  }

  productDetails(id: any) {
    this.productId = id;
    if (this.productId) {
      const request = {
        productId: this.productId,
        pageNumber: this.productPageNumber,
        pageSize: this.productPageSize,
      };
      this.store.dispatch(
        productDetailsActions.productDetails({
          request: {
            id: Number(this.productId),
          },
        })
      );
      this.productRecommendation$ =
        this.productService.getProductRecommendation({
          productId: this.productId,
          pageNumber: this.productPageNumber,
          pageSize: this.productPageSize,
        });

      this.productReviews$ = this.productService.getReviewsByProduct({
        productId: this.productId,
        pageNumber: this.reviewPageNumber,
        pageSize: this.reviewPageSize,
      });
    }

    window.scrollTo(0, 0);
  }

  ngOnInit(): void {
    let i = 1;
    for (i = 1; i <= 5; i++) {
      if (i <= this.value) {
        this.starList.push('fas fa-star');
      } else if (i <= this.value + 0.5) {
        this.starList.push('fas fa-star-half');
      } else {
        this.starList.push('far fa-star');
      }
    }

    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.store.dispatch(
        productDetailsActions.productDetails({
          request: {
            id: Number(id),
          },
        })
      );
    }

    this.productReviews$ = this.productService.getReviewsByProduct({
      productId: Number(id),
      pageNumber: this.reviewPageNumber,
      pageSize: this.reviewPageSize,
    });

    this.productRecommendation$ = this.productService.getProductRecommendation({
      productId: Number(id),
      pageNumber: this.productPageNumber,
      pageSize: this.productPageSize,
    });

    this.hoveredIndex = this.rating + 1;
  }

  nextProductsByPage(id: any) {
    if (Number(id)) {
      this.productPageNumber += 1;
      this.productCurrentPage += 1;
      this.productId = id;
      const request = {
        productId: this.productId,
        pageNumber: this.productPageNumber,
        pageSize: this.productPageSize,
      };
      this.productRecommendation$ =
        this.productService.getProductRecommendation(request);
    }
  }

  prevProductsByPage(id: any) {
    if (Number(id)) {
      this.productPageNumber -= 1;
      this.productCurrentPage -= 1;
      this.productId = id;
      const request = {
        productId: this.productId,
        pageNumber: this.productPageNumber,
        pageSize: this.productPageSize,
      };
      this.productRecommendation$ =
        this.productService.getProductRecommendation(request);
    }
  }

  prevReviewsByPage(productId: any) {
    if (Number(productId)) {
      this.reviewPageNumber -= 1;
      this.reviewCurrentPage -= 1;
      const request = {
        productId: Number(productId),
        pageNumber: this.reviewPageNumber,
        pageSize: this.reviewPageSize,
      };
      this.productReviews$ = this.productService.getReviewsByProduct(request);
    }
  }

  nextReviewsByPage(productId: any) {
    if (Number(productId)) {
      this.reviewPageNumber += 1;
      this.reviewCurrentPage += 1;
      const request = {
        productId: Number(productId),
        pageNumber: this.reviewPageNumber,
        pageSize: this.reviewPageSize,
      };
      this.productReviews$ = this.productService.getReviewsByProduct(request);
    }
  }

  get fc() {
    return this.form.controls;
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }
}
