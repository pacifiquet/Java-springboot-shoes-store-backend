import {Component, OnDestroy, OnInit} from '@angular/core';
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
  products$ = combineLatest({
    recentUpdatesProducts: this.store.select(selectRecentProducts),
    isLoaded: this.store.select(selectIsRecentLoaded),
  });
  unsub$ = new Subject<void>();
  limit = 5;
  offset = 0;
  data$ = new Subject<any>();
  constructor(private store: Store) {
    const request = {
      limit: this.limit,
      offset: this.offset,
    };
    recentUpdateProductsActions.recentUpdateProducts({request: request});
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }
}
