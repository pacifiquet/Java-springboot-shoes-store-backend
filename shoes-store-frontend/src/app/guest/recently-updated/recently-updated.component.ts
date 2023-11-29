import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject, combineLatest, takeUntil} from 'rxjs';
import {
  ProductInterface,
  RecentUpdateProductsResponse,
} from '../store/product/types/ProductInterface';
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
  isNext = false;
  isPrev = true;
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

  ngOnInit(): void {}

  nextProductsByPage() {
    this.currentPage += 1;
    this.offset = 5;
    this.isNext = true;
    this.isPrev = false;
    this.store.dispatch(
      recentUpdateProductsActions.recentUpdateProducts({
        request: {limit: this.limit, offset: this.offset},
      })
    );
  }

  prevProductsByPage() {
    this.currentPage -= 1;
    this.offset = 0;
    this.isNext = false;
    this.isPrev = true;
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
