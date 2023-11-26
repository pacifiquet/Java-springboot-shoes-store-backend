import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, combineLatest, takeUntil} from 'rxjs';
import {ProductInterface} from 'src/app/dto/product/product-interface';
import {ProductsService} from 'src/app/services/product/products.service';
import {RecentUpdateProductsResponse} from '../store/product/types/ProductInterface';
import {Store} from '@ngrx/store';
import {
  selectIsRecentLoaded,
  selectRecentProducts,
} from '../store/product/productReducer';
import {recentUpdateProductsActions} from '../store/product/actions';

@Component({
  selector: 'app-recently-updated',
  templateUrl: './recently-updated.component.html',
  styleUrls: ['./recently-updated.component.css'],
})
export class RecentlyUpdatedComponent implements OnInit, OnDestroy {
  recentlyUpdated: RecentUpdateProductsResponse[] = [];
  currentPage = 1;
  firstPage = false;
  lastPage = false;
  limit = 5;
  offset = 0;
  products$ = combineLatest({
    recentUpdatesProducts: this.store.select(selectRecentProducts),
    isLoaded: this.store.select(selectIsRecentLoaded),
  });
  unsub$ = new Subject<void>();

  @Input() recentProducts: ProductInterface[] = [];
  @Input() message: string = '';
  constructor(private store: Store) {}

  ngOnInit(): void {
    if (this.offset === 0) {
      this.firstPage = true;
    } else if (this.offset === 5) {
      this.lastPage = true;
    } else {
      this.lastPage = false;
      this.firstPage = false;
    }
  }

  nextProductsByPage() {
    this.currentPage += 1;
    this.offset = 5;

    this.store.dispatch(
      recentUpdateProductsActions.recentUpdateProducts({
        request: {limit: this.limit, offset: this.offset},
      })
    );
  }

  prevProductsByPage() {
    this.currentPage -= 1;
    this.offset = 0;
    this.store.dispatch(
      recentUpdateProductsActions.recentUpdateProducts({
        request: {limit: this.limit, offset: this.offset},
      })
    );
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }
}
