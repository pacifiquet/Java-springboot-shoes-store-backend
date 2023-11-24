import {
  ProductDetailsAndRecommendationInterface,
  ProductsStateStateInterface,
  RecentUpdateProductsStateInterace,
  TopSoldProductInterface,
} from './types/ProductInterface';

export const productListInitialState: ProductsStateStateInterface = {
  isProductsLoaded: false,
  productList: null,
  errors: null,
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
