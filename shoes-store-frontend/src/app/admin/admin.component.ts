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
import {
  selectResponse,
  selectUploadError,
  selectUploadResponse,
} from './store/admin.reducers';
import {Router} from '@angular/router';
import {productListUploadActions} from './store/actions';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent implements OnInit, OnDestroy {
  unsub$ = new Subject<void>();
  pageNumber: number = 0;
  pageSize: number = 3;
  currentPage: number = 0;
  totalPage!: number;
  productList: Array<ProductInterface> = [];
  ids: Array<number> = [];
  id: number = 0;
  fileMessage: string = '';
  productId: number = 0;
  successMessage = '';
  errorMessage = '';
  productListFile: File | undefined | null;

  productList$ = combineLatest({
    products: this.store.select(selectProductList),
    errorMessage: this.store.select(selectErrors),
    profile: this.store.select(selectUserProfile),
    deleteResponse: this.store.select(selectResponse),
    uploadSuccess: this.store.select(selectUploadResponse),
    uploadError: this.store.select(selectUploadError),
  });

  constructor(
    private store: Store,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.store.dispatch(userProfileActions.userProfile());
    this.store.dispatch(
      productListActions.productList({
        request: {pageNumber: this.pageNumber, pageSize: this.pageSize},
      })
    );
  }

  ngOnInit(): void {
    this.id = 3;
    this.productList$
      .pipe(takeUntil(this.unsub$))
      .subscribe(({products, deleteResponse, uploadSuccess, uploadError}) => {
        if (products) {
          this.productList = products.content;
          this.currentPage = products.number + +1;
          this.totalPage = products.totalPages;
        }

        if (deleteResponse?.success) {
          this.successMessage = deleteResponse.success;
          this.cdr.markForCheck();
          setTimeout(() => {
            window.location.reload();
            this.cdr.markForCheck();
          }, 2000);
        }

        if (uploadSuccess?.success) {
          this.successMessage = uploadSuccess.success;
          setTimeout(() => {
            this.successMessage = '';
            this.errorMessage = '';
            window.location.reload();
            this.cdr.markForCheck();
          }, 2000);
        }

        if (uploadError?.message) {
          this.successMessage = uploadError.message;
          setTimeout(() => {
            this.successMessage = '';
            this.errorMessage = '';
            this.cdr.markForCheck();
          }, 2000);
        }
      });
  }

  nextProductsByPage() {
    this.pageNumber += 1;
    this.store.dispatch(
      productListActions.productList({
        request: {pageNumber: this.pageNumber, pageSize: this.pageSize},
      })
    );
  }

  prevProductsByPage() {
    this.pageNumber -= 1;
    this.store.dispatch(
      productListActions.productList({
        request: {pageNumber: this.pageNumber, pageSize: this.pageSize},
      })
    );
  }

  selectProductsTodelete(id: any) {
    this.ids.push(id);
  }

  handleDeleteMultipleProducts() {
    this.isDeleting = true;
  }

  productsFileHandler(event: Event) {
    this.productListFile = (event.target as HTMLInputElement).files?.[0];
  }

  productListUploadHandler() {
    if (this.productListFile?.type === 'text/csv') {
      this.store.dispatch(
        productListUploadActions.productListUpload({
          request: this.productListFile,
        })
      );
    }
  }

  isLogout: boolean = false;
  isDayActive: boolean = true;
  isWeekActive: boolean = false;
  isMonthActive: boolean = false;
  isYearActive: boolean = false;
  isDashboardActive: boolean = true;
  isAddProductActive: boolean = false;
  isDeleting: boolean = false;

  isMenNavActive: boolean = true;
  isWomenNavActive: boolean = true;
  isKidsNavActive: boolean = false;

  deleteProduct() {
    this.isDeleting = true;
  }

  approveDelete(event: boolean) {
    this.isDeleting = !event;
  }

  cancelDelete(event: boolean) {
    this.isDeleting = event;
  }

  addProduct() {
    this.isDashboardActive = false;
    this.isAddProductActive = true;
  }

  viewProductAndEdit(id: any) {
    this.id = Number(id);
    this.cdr.markForCheck();
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
