import {inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ProductsService} from 'src/app/services/product/products.service';
import {
  productAndRecommendationActions,
  productListActions,
  recentUpdateProductsActions,
  topSoldproductListActions,
} from './actions';
import {catchError, map, of, switchMap} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {
  ContentResponse,
  ProductAndRecommendationResponse,
  RecentUpdateProductsResponse,
} from './types/ProductInterface';

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

export const topSoldproductListEffect = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductsService)) => {
    return actions$.pipe(
      ofType(topSoldproductListActions.topSoldProductList),
      switchMap(({request}) => {
        return productService
          .getTopSoldProducts(request.pageSize, request.pageNumber)
          .pipe(
            map((response: ContentResponse) =>
              topSoldproductListActions.topSoldProductListSuccess({response})
            ),
            catchError((errorResponse: HttpErrorResponse) =>
              of(
                topSoldproductListActions.topSoldProductListFail({
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

export const productAndRecommendEffect = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductsService)) => {
    return actions$.pipe(
      ofType(productAndRecommendationActions.productAndRecommendation),
      switchMap(({request}) => {
        return productService.getProductDetailsAndRecommendation(request).pipe(
          map((response: ProductAndRecommendationResponse) =>
            productAndRecommendationActions.productAndRecommendationSuccess({
              response,
            })
          ),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              productAndRecommendationActions.productAndRecommendationFail({
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

export const recentUpdateEffect = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductsService)) => {
    return actions$.pipe(
      ofType(recentUpdateProductsActions.recentUpdateProducts),
      switchMap(({request}) => {
        return productService.getRecentUpdateProducts(request).pipe(
          map((response: RecentUpdateProductsResponse[]) =>
            recentUpdateProductsActions.recentUpdateProductsSuccess({
              response,
            })
          ),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              recentUpdateProductsActions.recentUpdateProductsFail({
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
