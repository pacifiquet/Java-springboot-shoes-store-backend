import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {ProductResponseInterface} from './types/ProductInterface';
import {BackendErrorInterface} from 'src/app/types/backend.error.interface';

export const productListActions = createActionGroup({
  source: 'productList',
  events: {
    ProductList: props<{request: {pageSize: number; pageNumber: number}}>(),
    'ProductList success': props<{
      response: Array<ProductResponseInterface>;
    }>(),
    'ProductList fail': props<{errorResponse: BackendErrorInterface}>(),
  },
});
