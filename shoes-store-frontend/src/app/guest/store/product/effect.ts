import {inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ProductsService} from 'src/app/services/product/products.service';
import {productListActions} from './actions';
import {switchMap} from 'rxjs';

export const productListEffect = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductsService)) => {
    return actions$.pipe(ofType(productListActions.productList));
  },
  {functional: true}
);
