import {inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ProductsService} from 'src/app/services/product/products.service';
import {
  addProductActions,
  deleteListProductActions,
  deleteProductActions,
  productDetailsActions,
  productListUploadActions,
  updateProductActions,
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

export const addProductEffect = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductsService)) => {
    return actions$.pipe(
      ofType(addProductActions.addProduct),
      switchMap(({request}) => {
        return productService.addProduct(request).pipe(
          map((response: BackendSuccessResponseInterface) =>
            addProductActions.addProductSuccess({response})
          ),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              addProductActions.addProductFail({
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

export const deleteProductEffect = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductsService)) => {
    return actions$.pipe(
      ofType(deleteProductActions.deleteProduct),
      switchMap(({request}) => {
        return productService.deleteProduct(request.id).pipe(
          map((deleteProductSuccessResponse: BackendSuccessResponseInterface) =>
            deleteProductActions.deleteProductSuccess({
              deleteProductSuccessResponse,
            })
          ),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              deleteProductActions.deleteProductFail({
                deleteProductErrorResponse: errorResponse.error,
              })
            )
          )
        );
      })
    );
  },
  {functional: true}
);

export const updateProductEffect = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductsService)) => {
    return actions$.pipe(
      ofType(updateProductActions.updateProduct),
      switchMap(({request}) => {
        return productService.updateProduct(request).pipe(
          map((response: BackendSuccessResponseInterface) =>
            updateProductActions.updateProductSuccess({response})
          ),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              updateProductActions.updateProductFail({
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
