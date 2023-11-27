import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {topSoldproductListActions} from '../store/product/actions';
import {Subject, combineLatest, takeUntil} from 'rxjs';
import {selectTopSold} from '../store/product/productReducer';
import {ProductInterface} from '../store/product/types/ProductInterface';

@Component({
  selector: 'app-top-sold',
  templateUrl: './top-sold.component.html',
  styleUrls: ['./top-sold.component.css'],
})
export class TopSoldComponent implements OnInit, OnDestroy {
  unsub$ = new Subject<void>();
  topTenProduct: ProductInterface[] = [];
  pageNumber = 0;
  currentPage = 1;
  pageSize = 5;

  topSold$ = combineLatest({
    topSoldProducts: this.store.select(selectTopSold),
  });
  ngOnInit(): void {
    this.store.dispatch(
      topSoldproductListActions.topSoldProductList({
        request: {pageNumber: this.pageNumber, pageSize: this.pageSize},
      })
    );
    this.topSold$
      .pipe(takeUntil(this.unsub$))
      .subscribe(({topSoldProducts}) => {
        if (topSoldProducts?.content) {
          this.topTenProduct = topSoldProducts.content;
        }
      });
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }

  constructor(private store: Store) {}

  nextProductsByPage() {
    this.pageNumber += 1;
    this.currentPage += 1;
    this.store.dispatch(
      topSoldproductListActions.topSoldProductList({
        request: {
          pageSize: this.pageSize,
          pageNumber: this.pageNumber,
        },
      })
    );
  }

  prevProductsByPage() {
    this.pageNumber -= 1;
    this.currentPage -= 1;
    this.store.dispatch(
      topSoldproductListActions.topSoldProductList({
        request: {
          pageSize: this.pageSize,
          pageNumber: this.pageNumber,
        },
      })
    );
  }
}
