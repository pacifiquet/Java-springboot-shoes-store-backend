import {inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ProductsService} from 'src/app/services/product/products.service';
import {
  deleteListProductActions,
  productDetailsActions,
  productListUploadActions,
} from './actions';
import {catchError, map, of, switchMap} from 'rxjs';
import {BackendSuccessResponseInterface} from 'src/app/types/BackendSuccessResponse.interface';
import {HttpErrorResponse} from '@angular/common/http';
import {ProductInterface} from 'src/app/guest/store/product/types/ProductInterface';

export const productListEffect = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductsService)) => {
    return actions$.pipe(
      ofType(deleteListProductActions.productListDelete),
      switchMap(({request}) => {
        return productService.deleteListOfProduct(request).pipe(
          map((response: BackendSuccessResponseInterface) =>
            deleteListProductActions.productListDeleteSuccess({response})
          ),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              deleteListProductActions.productListDeleteFailed({
                error: errorResponse.error,
              })
            )
          )
        );
      })
    );
  },
  {functional: true}
);

export const uploadProductEffect = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductsService)) => {
    return actions$.pipe(
      ofType(productListUploadActions.productListUpload),
      switchMap(({request}) => {
        return productService.uploadProductList(request).pipe(
          map((response: BackendSuccessResponseInterface) =>
            productListUploadActions.productListUploadSuccess({response})
          ),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              productListUploadActions.productListUploadFailed({
                erros: errorResponse.error,
              })
            )
          )
        );
      })
    );
  },
  {functional: true}
);

export const productDetailsEffect = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductsService)) => {
    return actions$.pipe(
      ofType(productDetailsActions.productDetails),
      switchMap(({request}) => {
        return productService.getProductDetails(request).pipe(
          map((response: ProductInterface) =>
            productDetailsActions.productDetailsSuccess({response})
          ),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              productDetailsActions.productDetailsFail({
                errorResponse: errorResponse.error,
              })
            )
          )
        );
      })
    );
  },
  {functional: true}
);
