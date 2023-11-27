import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {Store} from '@ngrx/store';
import {Subject, combineLatest, takeUntil} from 'rxjs';
import {
  productListActions,
  productListByCategiryActions,
} from '../guest/store/product/actions';
import {
  selectErrors,
  selectIsCategoryLoaded,
  selectProductList,
  selectProductListByCategory,
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
import {ContentResponse} from '../guest/store/product/types/ProductInterface';
import {FormBuilder, Validators, FormArray, FormControl} from '@angular/forms';

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
  productListAdmin: ContentResponse = {
    content: [],
    length: 0,
    size: 0,
    totalElements: 0,
    totalPages: 0,
    number: 0,
    last: false,
    first: false,
  };
  ids: Array<number> = [];
  id!: number;
  fileMessage: string = '';
  productId: number = 0;
  successMessage = '';
  errorMessage = '';
  category: string = '';
  productCategory: string = '';
  isMenCategory: boolean = false;
  isWomenCategory: boolean = false;
  isKidsCategory: boolean = false;
  isCategoryFilter: boolean = false;
  isChecked: boolean = false;
  form: any;

  isSelectDeleting: boolean = false;
  productListFile: File | undefined | null;

  productList$ = combineLatest({
    products: this.store.select(selectProductList),
    errorMessage: this.store.select(selectErrors),
    profile: this.store.select(selectUserProfile),
    deleteResponse: this.store.select(selectResponse),
    uploadSuccess: this.store.select(selectUploadResponse),
    uploadError: this.store.select(selectUploadError),
    byCategoryProducts: this.store.select(selectProductListByCategory),
    isCategory: this.store.select(selectIsCategoryLoaded),
  });

  constructor(
    private store: Store,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      productIds: this.fb.array([], [Validators.required]),
    });
    this.store.dispatch(userProfileActions.userProfile());
    this.store.dispatch(
      productListActions.productList({
        request: {pageNumber: this.pageNumber, pageSize: this.pageSize},
      })
    );
  }

  ngOnInit(): void {
    this.productList$
      .pipe(takeUntil(this.unsub$))
      .subscribe(
        ({
          products,
          deleteResponse,
          uploadSuccess,
          uploadError,
          byCategoryProducts,
        }) => {
          if (products) {
            this.productListAdmin = products;
            this.currentPage = products.number + 1;
            this.totalPage = products.totalPages;
          }

          if (byCategoryProducts) {
            this.productListAdmin = byCategoryProducts;
            this.currentPage = byCategoryProducts.number + 1;
          }

          if (byCategoryProducts?.content.length === 0) {
            this.pageNumber = 0;
            this.pageSize = 3;
            this.byCategory(this.productCategory);
          }

          if (deleteResponse?.success) {
            this.successMessage = deleteResponse.success;
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }

          if (uploadSuccess?.success) {
            this.successMessage = uploadSuccess.success;
            setTimeout(() => {
              this.successMessage = '';
              this.errorMessage = '';
              window.location.reload();
            }, 2000);
          }

          if (uploadError?.message) {
            this.successMessage = uploadError.message;
            setTimeout(() => {
              this.successMessage = '';
              this.errorMessage = '';
            }, 2000);
          }
        }
      );

    if (this.ids.length === 0) {
      this.isSelectDeleting = false;
    }
  }

  nextProductsByPage() {
    this.pageNumber += 1;

    if (this.productCategory !== '') {
      this.store.dispatch(
        productListByCategiryActions.productListByCategory({
          request: {
            category: this.productCategory,
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
    if (this.productCategory) {
      this.store.dispatch(
        productListByCategiryActions.productListByCategory({
          request: {
            category: this.productCategory,
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

  selectProductsTodelete(event: any) {
    const productIds: FormArray = this.form.get('productIds') as FormArray;
    if (event.target.checked) {
      productIds.push(new FormControl(event.target.value));
    } else {
      const index = productIds.controls.findIndex(
        (x) => x.value === event.target.value
      );
      productIds.removeAt(index);
    }
    this.ids = [...productIds.getRawValue()];
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

  byCategory(category: string) {
    this.productCategory = category;
    this.isCategoryFilter = true;

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

    this.store.dispatch(
      productListByCategiryActions.productListByCategory({
        request: {
          category: this.productCategory,
          pageSize: this.pageSize,
          pageNumber: this.pageNumber,
        },
      })
    );
  }

  resetFilter() {
    window.location.reload();
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
    window.location.reload();
  }

  addProduct() {
    this.isDashboardActive = false;
    this.isAddProductActive = true;
  }

  viewProductAndEdit(id: any) {
    this.id = Number(id);
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
