import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import {faStarHalfAlt} from '@fortawesome/free-regular-svg-icons';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import {Store} from '@ngrx/store';
import {Subject, combineLatest, takeUntil} from 'rxjs';
import {ProductInterface} from 'src/app/dto/product/product-interface';
import {ProductsService} from 'src/app/services/product/products.service';
import {selectProductList} from '../store/product/productReducer';
import {productListActions} from '../store/product/actions';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecommendedComponent implements OnInit, OnDestroy {
  unsub$ = new Subject<void>();
  openProductModal: boolean = false;
  recommendedList: Array<ProductInterface> = [];
  average: number = 0;
  page: number = 3;
  pageNumber: number = 0;
  star = faStar;
  name = 'recommended';
  haflIcon = faStarHalfAlt;

  productsRecommended$ = combineLatest({
    recommendedList: this.store.select(selectProductList),
  });

  constructor(
    private productServie: ProductsService,
    private cdr: ChangeDetectorRef,
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {
    cdr.markForCheck();
  }

  ngOnInit(): void {
    this.store.dispatch(
      productListActions.productList({
        request: {pageNumber: this.pageNumber, pageSize: this.page},
      })
    );
    this.productsRecommended$
      .pipe(takeUntil(this.unsub$))
      .subscribe(({recommendedList}) => {
        if (recommendedList?.content) {
          this.recommendedList = recommendedList.content;
        }
      });
  }

  getProductReviewAverage(product: ProductInterface) {
    return [];
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
    this.unsub$.unsubscribe();
  }
}
