import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable, Subject, combineLatest, takeUntil} from 'rxjs';
import {
  productListActions,
  productListByCategiryActions,
} from '../guest/store/product/actions';
import {
  selectIsCategoryLoaded,
  selectProductList,
  selectProductListByCategory,
} from '../guest/store/product/productReducer';
import {selectUserProfile} from '../app.reducer';
import {userProfileActions} from '../profile/store/actions';
import {
  selectAddProductErrors,
  selectAddProductResponse,
  selectDeleteProducterror,
  selectDeleteProductresponse,
  selectIsSingleProductDelete,
  selectProduct,
  selectResponse,
  selectUpdateProductError,
  selectUpdateProductResponse,
  selectUploadError,
  selectUploadResponse,
} from './store/admin.reducers';
import {Router} from '@angular/router';
import {
  addProductActions,
  deleteProductActions,
  productDetailsActions,
  productListUploadActions,
  updateProductActions,
} from './store/actions';
import {
  ContentResponse,
  ProductInterface,
} from '../guest/store/product/types/ProductInterface';
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
  successMessage: string = '';
  errorMessage = '';
  category: string = '';
  productCategory: string = '';
  isMenCategory: boolean = false;
  isWomenCategory: boolean = false;
  isKidsCategory: boolean = false;
  isCategoryFilter: boolean = false;
  isChecked: boolean = false;
  isLogout: boolean = false;
  isDayActive: boolean = true;
  isWeekActive: boolean = false;
  isMonthActive: boolean = false;
  isYearActive: boolean = false;
  isDashboardActive: boolean = true;
  isAddProductActive: boolean = false;
  isDeleting: boolean = false;
  isUpdatingProduct = false;
  isAddingProduct = false;

  isMenNavActive: boolean = true;
  isWomenNavActive: boolean = true;
  isKidsNavActive: boolean = false;
  form: any;

  isSelectDeleting: boolean = false;
  productListFile: File | undefined | null;

  productDetail!: ProductInterface;
  adminData$ = combineLatest({
    products: this.store.select(selectProductList),
    profile: this.store.select(selectUserProfile),
    deleteListProductResponse: this.store.select(selectResponse),
    uploadSuccess: this.store.select(selectUploadResponse),
    uploadError: this.store.select(selectUploadError),
    byCategoryProducts: this.store.select(selectProductListByCategory),
    isCategory: this.store.select(selectIsCategoryLoaded),
    deleteProductResponse: this.store.select(selectDeleteProductresponse),
    deleteProductError: this.store.select(selectDeleteProducterror),
    isOneProductDelete: this.store.select(selectIsSingleProductDelete),
    addProductSuccessResponse: this.store.select(selectAddProductResponse),
    addProductErrorResponse: this.store.select(selectAddProductErrors),
    updateProductSuccessResponse: this.store.select(
      selectUpdateProductResponse
    ),
    updateProductErrorResponse: this.store.select(selectUpdateProductError),
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
    this.adminData$
      .pipe(takeUntil(this.unsub$))
      .subscribe(
        ({
          products,
          byCategoryProducts,
          uploadSuccess,
          deleteProductResponse,
          deleteListProductResponse,
          deleteProductError,
          uploadError,
          addProductErrorResponse,
          addProductSuccessResponse,
          updateProductErrorResponse,
          updateProductSuccessResponse,
        }) => {
          if (products) {
            this.productListAdmin = products;
            this.totalPage = products.totalPages;
          }

          if (byCategoryProducts) {
            this.productListAdmin = byCategoryProducts;
          }

          if (deleteListProductResponse?.success) {
            this.successMessage = deleteListProductResponse.success;
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } else if (deleteProductResponse?.success) {
            this.successMessage = deleteProductResponse.success;
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } else if (uploadSuccess?.success) {
            this.successMessage = uploadSuccess.success;
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } else if (addProductSuccessResponse?.success) {
            this.successMessage = addProductSuccessResponse.success;
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } else if (updateProductSuccessResponse?.success) {
            this.successMessage = updateProductSuccessResponse.success;
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }

          if (uploadError?.message) {
            this.errorMessage = uploadError?.message;
          } else if (deleteProductError?.message) {
            this.errorMessage = deleteProductError.message;
          } else if (addProductErrorResponse?.message) {
            this.errorMessage = addProductErrorResponse.message;
          } else if (updateProductErrorResponse?.message) {
            this.errorMessage = updateProductErrorResponse.message;
          }
        }
      );

    if (this.ids.length === 0) {
      this.isSelectDeleting = false;
    }
  }

  nextProductsByPage() {
    this.pageNumber += 1;
    this.currentPage += 1;

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
    this.currentPage -= 1;
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

  deleteProduct(id: any) {
    this.id = id;
    this.isDeleting = true;
  }

  approveDelete(event: boolean) {
    this.isDeleting = !event;
    if (event) {
      this.store.dispatch(
        deleteProductActions.deleteProduct({request: {id: this.id}})
      );
    }
  }

  cancelDelete(event: boolean) {
    this.isDeleting = event;
    window.location.reload();
  }

  addProduct() {
    this.isDashboardActive = false;
    this.isAddProductActive = true;
    this.isAddingProduct = true;
  }

  handleAddOrUpdateProductEvent(event: any) {
    if (this.isAddingProduct) {
      this.store.dispatch(
        addProductActions.addProduct({
          request: {
            productImage: event.productImage,
            productInfo: event.productInfo,
          },
        })
      );
      this.isAddingProduct = false;
    } else if (this.isUpdatingProduct) {
      this.store.dispatch(
        updateProductActions.updateProduct({
          request: {
            id: this.id,
            productRequest: event.productInfo,
            productImage: event.productImage,
          },
        })
      );
      this.isUpdatingProduct = false;
      this.isAddProductActive = false;
    }
  }

  viewProductAndEdit(id: any) {
    this.id = Number(id);
    this.isUpdatingProduct = true;
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
