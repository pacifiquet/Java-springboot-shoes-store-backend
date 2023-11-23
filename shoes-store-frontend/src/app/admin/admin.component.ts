import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {ProductInterface} from '../dto/product/product-interface';
import {Store} from '@ngrx/store';
import {Subject, combineLatest, takeUntil} from 'rxjs';
import {productListActions} from '../guest/store/product/actions';
import {
  selectErrors,
  selectProductList,
} from '../guest/store/product/productReducer';
import {selectUserProfile} from '../app.reducer';
import {userProfileActions} from '../profile/store/actions';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent implements OnInit, OnDestroy {
  unsub$ = new Subject<void>();
  pageNumber: number = 3;
  pageSize: number = 0;
  currentPage: number = 1;
  totalPage!: number;
  productList: Array<ProductInterface> = [];

  productList$ = combineLatest({
    products: this.store.select(selectProductList),
    errorMessage: this.store.select(selectErrors),
    profile: this.store.select(selectUserProfile),
  });
  constructor(private store: Store, private cdr: ChangeDetectorRef) {
    this.store.dispatch(userProfileActions.userProfile());
  }
  ngOnInit(): void {
    this.productList$.pipe(takeUntil(this.unsub$)).subscribe(({products}) => {
      if (products) {
        this.productList = products.content;
        this.currentPage += products.number;
        this.totalPage = products.totalPages;
      }
      if (products?.first) {
        this.pageSize += 1;
      }
    });
    this.getProductsByPage();
  }

  getProductsByPage() {
    this.store.dispatch(
      productListActions.productList({
        request: {pageNumber: this.pageNumber, pageSize: this.pageSize},
      })
    );
  }

  prevProductsByPage() {
    this.pageSize -= 1;
    this.currentPage = this.currentPage - 1;
    this.store.dispatch(
      productListActions.productList({
        request: {pageNumber: this.pageNumber, pageSize: this.pageSize},
      })
    );
  }

  isLogout: boolean = false;
  isDayActive: boolean = true;
  isWeekActive: boolean = false;
  isMonthActive: boolean = false;
  isYearActive: boolean = false;
  isDashboardActive: boolean = true;
  isAddProductActive: boolean = false;
  isDeletingProduct: boolean = false;

  isMenNavActive: boolean = true;
  isWomenNavActive: boolean = true;
  isKidsNavActive: boolean = false;

  deleteProduct() {
    this.isDeletingProduct = true;
  }

  approveDeleteProduct(event: boolean) {
    this.isDeletingProduct = event;
  }

  cancelDeleteProduct(event: boolean) {
    this.isDeletingProduct = event;
  }

  addProduct() {
    this.isDashboardActive = false;
    this.isAddProductActive = true;
  }

  viewProductAndEdit() {
    this.isAddProductActive = true;
  }

  hideAddProductModal(event: boolean) {
    this.isAddProductActive = !event;
    this.isDashboardActive = true;
  }

  dayStats() {
    this.isDayActive = true;
    this.isWeekActive = false;
    this.isMonthActive = false;
    this.isYearActive = false;
  }

  weekStats() {
    this.isDayActive = false;
    this.isWeekActive = true;
    this.isMonthActive = false;
    this.isYearActive = false;
  }
  monthStats() {
    this.isDayActive = false;
    this.isWeekActive = false;
    this.isMonthActive = true;
    this.isYearActive = false;
  }
  yearStats() {
    this.isDayActive = false;
    this.isWeekActive = false;
    this.isMonthActive = false;
    this.isYearActive = true;
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }
}
