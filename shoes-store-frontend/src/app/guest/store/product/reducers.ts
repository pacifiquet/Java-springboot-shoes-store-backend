import {createFeature, createReducer, on} from '@ngrx/store';
import {
  newArrivalProductListActions,
  recentUpdateProductsActions,
} from './actions';
import {
  newArrivalproductListInitialState,
  productAndRecommendationInitialState,
  productListInitialState,
  recentUpdateProductsInitialState,
  topSoldproductListInitialState,
} from './initialActionState';
import {
  productAndRecommendationActions,
  productListActions,
  topSoldproductListActions,
} from './actions';

export const productListFeature = createFeature({
  name: 'productList',
  reducer: createReducer(
    productListInitialState,
    on(productListActions.productList, (state) => ({
      ...state,
      isProductsLoaded: false,
    })),
    on(productListActions.productListSuccess, (state, action) => ({
      ...state,
      isProductsLoaded: true,
      productList: action.response,
    })),
    on(productListActions.productListFail, (state, action) => ({
      ...state,
      isProductsLoaded: false,
      errors: action.errorResponse,
    }))
  ),
});

export const topSoldproductListFeature = createFeature({
  name: 'topSoldproductList',
  reducer: createReducer(
    topSoldproductListInitialState,
    on(topSoldproductListActions.topSoldProductList, (state) => ({
      ...state,
      isProductsLoaded: false,
    })),
    on(
      topSoldproductListActions.topSoldProductListSuccess,
      (state, action) => ({
        ...state,
        isProductsLoaded: true,
        topSold: action.response,
      })
    ),
    on(topSoldproductListActions.topSoldProductListFail, (state, action) => ({
      ...state,
      isProductsLoaded: false,
      topErrors: action.errorResponse,
    }))
  ),
});

export const productDetailsAndRecomFeature = createFeature({
  name: 'productAndRecom',
  reducer: createReducer(
    productAndRecommendationInitialState,
    on(productAndRecommendationActions.productAndRecommendation, (state) => ({
      ...state,
      isLoaded: false,
    })),
    on(
      productAndRecommendationActions.productAndRecommendationSuccess,
      (state, action) => ({
        ...state,
        isLoaded: true,
        producAndRecommendation: action.response,
      })
    ),
    on(
      productAndRecommendationActions.productAndRecommendationFail,
      (state, action) => ({
        ...state,
        isLoaded: false,
        productAndRecomError: action.errorResponse,
      })
    )
  ),
});

export const recentUpdateFeature = createFeature({
  name: 'recentUpdate',
  reducer: createReducer(
    recentUpdateProductsInitialState,
    on(recentUpdateProductsActions.recentUpdateProducts, (state) => ({
      ...state,
      isRecentLoaded: false,
    })),
    on(
      recentUpdateProductsActions.recentUpdateProductsSuccess,
      (state, action) => ({
        ...state,
        isRecentLoaded: true,
        recentProducts: action.response,
      })
    ),
    on(
      recentUpdateProductsActions.recentUpdateProductsFail,
      (state, action) => ({
        ...state,
        isRecentLoaded: false,
        recentError: action.errorResponse,
      })
    )
  ),
});

export const newArrivalProductListFeature = createFeature({
  name: 'newArrivalProductList',
  reducer: createReducer(
    newArrivalproductListInitialState,
    on(newArrivalProductListActions.newArrivalProductList, (state) => ({
      ...state,
      isNewArrivalLoaded: false,
    })),
    on(
      newArrivalProductListActions.newArrivalProductListSuccess,
      (state, action) => ({
        ...state,
        isNewArrivalLoaded: true,
        newArrivalList: action.response,
      })
    ),
    on(
      newArrivalProductListActions.newArrivalProductListFail,
      (state, action) => ({
        ...state,
        isNewArrivalLoaded: false,
        newArrivalErrors: action.errorResponse,
      })
    )
  ),
});
