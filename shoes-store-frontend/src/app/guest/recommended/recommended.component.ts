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
import {Observable, Subject, combineLatest, takeUntil} from 'rxjs';
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
import {
  ContentResponse,
  ProductInterface,
} from '../store/product/types/ProductInterface';

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
  productsRecommendationData$: Observable<ContentResponse> =
    new Subject<ContentResponse>();
  paginationData: ContentResponse = {
    content: [],
    length: 0,
    size: 0,
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

  constructor(private store: Store, private productService: ProductsService) {}

  ngOnInit(): void {
    this.productsRecommendationData$ =
      this.productService.getRecommendationProducts({
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
      });
  }

  getProductReviewAverage() {
    return [];
  }

  byCategory(category: string) {
    this.isCategoryFilter = true;
    this.category = category;
    this.pageNumber = 0;
    this.currentPage = 1;

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

    if (this.isCategoryFilter && category) {
      this.productsRecommendationData$ =
        this.productService.getRecommendationProducts({
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
          category: category,
        });
    }
  }

  nextProductsByPage() {
    this.pageNumber += 1;
    this.currentPage += 1;

    if (this.category !== '') {
      this.productsRecommendationData$ =
        this.productService.getRecommendationProducts({
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
          category: this.category,
        });
    } else {
      this.productsRecommendationData$ =
        this.productService.getRecommendationProducts({
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
        });
    }
  }

  prevProductsByPage() {
    this.pageNumber -= 1;
    this.currentPage -= 1;
    if (this.category !== '') {
      this.productsRecommendationData$ =
        this.productService.getRecommendationProducts({
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
          category: this.category,
        });
    } else {
      this.productsRecommendationData$ =
        this.productService.getRecommendationProducts({
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
        });
    }
  }

  resetFilter() {
    window.location.reload();
    // this.router
    //   .navigateByUrl('/RefreshComponent', {skipLocationChange: true})
    //   .then(() => {
    //     this.router.navigate(['Your actualComponent']);
    //   });
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }
}
