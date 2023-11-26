import {createFeature, createReducer, on} from '@ngrx/store';
import {
  newArrivalProductListActions,
  productListByCategiryActions,
  productListByCategiryNewArrivalActions,
  recentUpdateProductsActions,
} from './actions';
import {
  newArrivalproductListInitialState,
  productAndRecommendationInitialState,
  productListByCategoryInitialState,
  productListByCategoryNewArrivalInitialState,
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

export const ProductListByCategoryFeature = createFeature({
  name: 'productsCategory',
  reducer: createReducer(
    productListByCategoryInitialState,
    on(productListByCategiryActions.productListByCategory, (state) => ({
      ...state,
      isCategoryLoaded: false,
    })),
    on(
      productListByCategiryActions.productListByCategorySuccess,
      (state, action) => ({
        ...state,
        isCategoryLoaded: true,
        productListByCategory: action.response,
      })
    ),
    on(
      productListByCategiryActions.productListByCategoryFail,
      (state, action) => ({
        ...state,
        isCategoryLoaded: false,
        errorsByCategory: action.errorResponse,
      })
    )
  ),
});

export const ProductListByCategoryNewArrivalFeature = createFeature({
  name: 'productsCategoryNewArrival',
  reducer: createReducer(
    productListByCategoryNewArrivalInitialState,
    on(
      productListByCategiryNewArrivalActions.productListByCategoryNewArrival,
      (state) => ({
        ...state,
        isCategoryNewArrivalLoaded: false,
      })
    ),
    on(
      productListByCategiryNewArrivalActions.productListByCategoryNewArrivalSuccess,
      (state, action) => ({
        ...state,
        isCategoryNewArrivalLoaded: true,
        productListByCategoryNewArrival: action.response,
      })
    ),
    on(
      productListByCategiryNewArrivalActions.productListByCategoryNewArrivalFail,
      (state, action) => ({
        ...state,
        isCategoryNewArrivalLoaded: false,
        errorsByCategoryNewArrival: action.errorResponse,
      })
    )
  ),
});
