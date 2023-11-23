import {inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ProductsService} from 'src/app/services/product/products.service';
import {productListActions} from './actions';
import {catchError, map, of, switchMap} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {ContentResponse} from './types/ProductInterface';

export const productListEffect = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductsService)) => {
    return actions$.pipe(
      ofType(productListActions.productList),
      switchMap(({request}) => {
        return productService
          .getAllProducts(request.pageSize, request.pageNumber)
          .pipe(
            map((response: ContentResponse) =>
              productListActions.productListSuccess({response})
            ),
            catchError((errorResponse: HttpErrorResponse) =>
              of(
                productListActions.productListFail({
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
