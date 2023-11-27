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
import {
  selectProductList,
  selectProductListByCategory,
} from '../store/product/productReducer';
import {
  productListActions,
  productListByCategiryActions,
} from '../store/product/actions';
import {ActivatedRoute, Router} from '@angular/router';
import {ContentResponse} from '../store/product/types/ProductInterface';

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
  pageSize: number = 3;
  pageNumber: number = 0;
  currentPage = 1;
  isFirstPage: boolean = false;
  isLastPage: boolean = false;
  isMenCategory: boolean = false;
  isWomenCategory: boolean = false;
  isKidsCategory: boolean = false;
  isCategoryFilter: boolean = false;
  star = faStar;
  category: string = '';
  name = 'recommended';
  haflIcon = faStarHalfAlt;
  paginationData: ContentResponse = {
    content: [],
    length: 0,
    size: 0,
    sort: {
      sorted: false,
      unsorted: false,
      empty: false,
    },
    totalElements: 0,
    totalPages: 0,
    number: 0,
    last: false,
    first: false,
  };

  productsRecommended$ = combineLatest({
    recommendedList: this.store.select(selectProductList),
    byCategoryProducts: this.store.select(selectProductListByCategory),
  });

  constructor(
    private productServie: ProductsService,
    private cdr: ChangeDetectorRef,
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {
    window.scrollTo(600, 0);
  }

  ngOnInit(): void {
    this.store.dispatch(
      productListActions.productList({
        request: {pageNumber: this.pageNumber, pageSize: this.pageSize},
      })
    );
    this.productsRecommended$
      .pipe(takeUntil(this.unsub$))
      .subscribe(({recommendedList, byCategoryProducts}) => {
        if (recommendedList?.content) {
          this.recommendedList = recommendedList.content;
          this.paginationData = recommendedList;
          this.isFirstPage = recommendedList.first;
          this.isLastPage = recommendedList.last;
        }

        if (byCategoryProducts) {
          this.recommendedList = byCategoryProducts.content;
          this.paginationData = byCategoryProducts;
          this.isFirstPage = byCategoryProducts.first;
          this.isLastPage = byCategoryProducts.last;
        }
      });
  }

  getProductReviewAverage(product: ProductInterface) {
    return [];
  }

  resetFilter() {
    window.location.reload();
  }

  byCategory(category: string) {
    this.isCategoryFilter = true;
    this.category = category;

    if (category === 'men') {
      this.isMenCategory = true;
      this.isKidsCategory = false;
      this.isWomenCategory = false;
    } else if (category === 'women') {
      this.isMenCategory = false;
      this.isKidsCategory = false;
      this.isWomenCategory = true;
    } else if (category === 'kids') {
      this.isMenCategory = false;
      this.isKidsCategory = true;
      this.isWomenCategory = false;
    }
    if (this.isCategoryFilter) {
      this.store.dispatch(
        productListByCategiryActions.productListByCategory({
          request: {
            category: this.category,
            pageSize: this.pageSize,
            pageNumber: this.pageNumber,
          },
        })
      );
    }
  }

  nextProductsByPage() {
    this.pageNumber += 1;
    this.currentPage += 1;

    if (this.category !== '') {
      this.store.dispatch(
        productListByCategiryActions.productListByCategory({
          request: {
            category: this.category,
            pageSize: this.pageSize,
            pageNumber: this.pageNumber,
          },
        })
      );
    } else {
      this.store.dispatch(
        productListActions.productList({
          request: {pageNumber: this.pageNumber, pageSize: this.pageSize},
        })
      );
    }
  }

  prevProductsByPage() {
    this.pageNumber -= 1;
    this.currentPage -= 1;
    if (this.category !== '') {
      this.store.dispatch(
        productListByCategiryActions.productListByCategory({
          request: {
            category: this.category,
            pageSize: this.pageSize,
            pageNumber: this.pageNumber,
          },
        })
      );
    } else {
      this.store.dispatch(
        productListActions.productList({
          request: {pageNumber: this.pageNumber, pageSize: this.pageSize},
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
    this.unsub$.unsubscribe();
  }
}
