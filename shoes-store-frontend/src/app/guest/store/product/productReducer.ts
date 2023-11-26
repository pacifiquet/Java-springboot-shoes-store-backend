import {ProductListByCategoryNewArrivalFeature} from './reducers';
import {
  ProductListByCategoryFeature,
  newArrivalProductListFeature,
} from './reducers';
import {
  productDetailsAndRecomFeature,
  productListFeature,
  recentUpdateFeature,
  topSoldproductListFeature,
} from './reducers';

export const {
  name: productFeatureKey,
  reducer: productListReducer,
  selectIsProductsLoaded,
  selectErrors,
  selectProductList,
} = productListFeature;

export const {
  name: topSoldKey,
  reducer: topSoldReducer,
  selectTopSold,
} = topSoldproductListFeature;

export const {
  name: productRecomKey,
  reducer: productAndRecomReducer,
  selectProducAndRecommendation,
  selectProductAndRecomError,
  selectIsLoaded,
} = productDetailsAndRecomFeature;

export const {
  name: recentUpdateKey,
  reducer: recentUpdateRecuder,
  selectIsRecentLoaded,
  selectRecentProducts,
  selectRecentError,
} = recentUpdateFeature;

export const {
  name: newArrivalProductsKey,
  reducer: newArrivalProductsRecuder,
  selectIsNewArrivalLoaded,
  selectNewArrivalErrors,
  selectNewArrivalList,
} = newArrivalProductListFeature;

export const {
  name: productListByCategoryKey,
  reducer: productListByCategoryRecuder,
  selectIsCategoryLoaded,
  selectErrorsByCategory,
  selectProductListByCategory,
} = ProductListByCategoryFeature;

export const {
  name: productListByCategoryNewArrivalKey,
  reducer: productListByCategoryNewArrivalRecuder,
  selectErrorsByCategoryNewArrival,
  selectIsCategoryNewArrivalLoaded,
  selectProductListByCategoryNewArrival,
} = ProductListByCategoryNewArrivalFeature;
