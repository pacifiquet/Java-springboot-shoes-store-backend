import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable, Subject, combineLatest} from 'rxjs';
import {selectTopSold} from '../store/product/productReducer';
import {ProductInterface} from '../store/product/types/ProductInterface';
import {ProductsService} from 'src/app/services/product/products.service';

@Component({
  selector: 'app-top-sold',
  templateUrl: './top-sold.component.html',
  styleUrls: ['./top-sold.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopSoldComponent implements OnInit, OnDestroy {
  unsub$ = new Subject<void>();
  topTenProduct = [];
  topTenRatedProducts$!: Observable<ProductInterface[]> | null | undefined;
  currentPage = 1;
  offset = 0;
  limit = 5;
  isNext: boolean = false;
  isPrev: boolean = true;

  topSold$ = combineLatest({
    topSoldProducts: this.store.select(selectTopSold),
  });

  constructor(
    private store: Store,
    private cdr: ChangeDetectorRef,
    private productService: ProductsService
  ) {
    const request = {
      limit: 5,
      offset: 0,
    };
    this.topTenRatedProducts$ =
      this.productService.getTopTenRatedProducts(request);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }

  nextProductsByPage() {
    this.offset = 5;
    this.currentPage += 1;
    this.isNext = true;
    this.isPrev = false;
    this.topTenRatedProducts$ = this.productService.getTopTenRatedProducts({
      limit: this.limit,
      offset: this.offset,
    });
  }

  prevProductsByPage() {
    this.offset = 0;
    this.currentPage -= 1;
    this.isPrev = true;
    this.isNext = false;
    this.topTenRatedProducts$ = this.productService.getTopTenRatedProducts({
      limit: this.limit,
      offset: this.offset,
    });
  }
}
