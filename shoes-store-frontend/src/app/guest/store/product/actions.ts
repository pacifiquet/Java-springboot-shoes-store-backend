import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {BackendErrorInterface} from 'src/app/types/backend.error.interface';
import {ContentResponse} from './types/ProductInterface';

export const productListActions = createActionGroup({
  source: 'productList',
  events: {
    ProductList: props<{request: {pageSize: number; pageNumber: number}}>(),
    'ProductList success': props<{
      response: ContentResponse;
    }>(),
    'ProductList fail': props<{errorResponse: BackendErrorInterface}>(),
  },
});
