import {
  NewArrivalProductsStateStateInterface,
  ProductDetailsAndRecommendationInterface,
  ProductsByCategoryNewArrivalStateStateInterface,
  ProductsByCategoryStateStateInterface,
  ProductsStateStateInterface,
  RecentUpdateProductsStateInterace,
  TopSoldProductInterface,
} from './types/ProductInterface';

export const productListInitialState: ProductsStateStateInterface = {
  isProductsLoaded: false,
  productList: null,
  errors: null,
};

export const newArrivalproductListInitialState: NewArrivalProductsStateStateInterface =
  {
    isNewArrivalLoaded: false,
    newArrivalList: null,
    newArrivalErrors: null,
  };

export const productListByCategoryInitialState: ProductsByCategoryStateStateInterface =
  {
    isCategoryLoaded: false,
    productListByCategory: null,
    errorsByCategory: null,
  };

export const productListByCategoryNewArrivalInitialState: ProductsByCategoryNewArrivalStateStateInterface =
  {
    isCategoryNewArrivalLoaded: false,
    productListByCategoryNewArrival: null,
    errorsByCategoryNewArrival: null,
  };

export const topSoldproductListInitialState: TopSoldProductInterface = {
  isProductsLoaded: false,
  topSold: null,
  topErrors: null,
};

export const productAndRecommendationInitialState: ProductDetailsAndRecommendationInterface =
  {
    isLoaded: false,
    producAndRecommendation: undefined,
    productAndRecomError: null,
  };

export const recentUpdateProductsInitialState: RecentUpdateProductsStateInterace =
  {
    isRecentLoaded: false,
    recentProducts: undefined,
    recentError: null,
  };
