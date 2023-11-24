import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {BackendErrorInterface} from 'src/app/types/backend.error.interface';
import {
  ContentResponse,
  ProductAndRecommendationResponse,
  RecentUpdateProductsResponse,
} from './types/ProductInterface';

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

export const topSoldproductListActions = createActionGroup({
  source: 'topSoldproductList',
  events: {
    TopSoldProductList: props<{
      request: {pageSize: number; pageNumber: number};
    }>(),
    'TopSoldProductList success': props<{
      response: ContentResponse;
    }>(),
    'TopSoldProductList fail': props<{errorResponse: BackendErrorInterface}>(),
  },
});

export const productAndRecommendationActions = createActionGroup({
  source: 'productAndRecom',
  events: {
    ProductAndRecommendation: props<{
      request: {id: number; pageSize: number; pageNumber: number};
    }>(),
    'ProductAndRecommendation success': props<{
      response: ProductAndRecommendationResponse;
    }>(),
    'ProductAndRecommendation fail': props<{
      errorResponse: BackendErrorInterface;
    }>(),
  },
});

export const recentUpdateProductsActions = createActionGroup({
  source: 'recentUpdate',
  events: {
    RecentUpdateProducts: props<{
      request: {limit: number; offset: number};
    }>(),
    'RecentUpdateProducts success': props<{
      response: RecentUpdateProductsResponse[];
    }>(),
    'RecentUpdateProducts fail': props<{
      errorResponse: BackendErrorInterface;
    }>(),
  },
});
