import {BackendErrorInterface} from 'src/app/types/backend.error.interface';

export interface ProductInterface {
  id?: number;
  category?: string;
  stock?: number;
  rating?: number;
  totalRatings?: string;
  productName?: string;
  productUrl?: string;
  price?: number;
  description?: string;
  createdAt?: Date;
}
interface ReviewInterface {
  rating: number;
  comment: string;
  createdAt: string;
  reviewUserResponse: {
    firstName: string;
    lastName: string;
    profileImage: string;
  };
}

interface ReviewResponse {
  content: ReviewInterface[];
  length: number;
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
  last: boolean;
  first: boolean;
}

export interface RecentUpdateProductsResponse {
  id?: number;
  rating?: number;
  productName?: string;
  url?: string;
  price?: number;
}

export interface ContentResponse {
  content: ProductInterface[];
  length: number;
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
  last: boolean;
  first: boolean;
}

export interface ProductAndRecommendationResponse {
  productResponse: ProductInterface;
  recommendedProducts: ContentResponse;
  reviewResponse: ReviewResponse;
}

export interface ProductsStateStateInterface {
  isProductsLoaded: boolean;
  productList: ContentResponse | null | undefined;
  errors: BackendErrorInterface | null | undefined;
}

export interface ProductsByCategoryStateStateInterface {
  isCategoryLoaded: boolean;
  productListByCategory: ContentResponse | null | undefined;
  errorsByCategory: BackendErrorInterface | null | undefined;
}

export interface ProductsByCategoryNewArrivalStateStateInterface {
  isCategoryNewArrivalLoaded: boolean;
  productListByCategoryNewArrival: ContentResponse | null | undefined;
  errorsByCategoryNewArrival: BackendErrorInterface | null | undefined;
}

export interface NewArrivalProductsStateStateInterface {
  isNewArrivalLoaded: boolean;
  newArrivalList: ContentResponse | null | undefined;
  newArrivalErrors: BackendErrorInterface | null | undefined;
}

export interface TopSoldProductInterface {
  isProductsLoaded: boolean;
  topSold: ContentResponse | null | undefined;
  topErrors: BackendErrorInterface | null | undefined;
}

export interface ProductDetailsInterface {
  isLoaded: boolean;
  product: ProductInterface | undefined | null;
  productError: BackendErrorInterface | undefined | null;
}

export interface ProductDetailsAndRecommendationInterface {
  isLoaded: boolean;
  producAndRecommendation: ProductAndRecommendationResponse | null | undefined;
  productAndRecomError: BackendErrorInterface | null | undefined;
}

export interface RecentUpdateProductsStateInterace {
  isRecentLoaded: boolean;
  recentProducts: RecentUpdateProductsResponse[] | null | undefined;
  recentError: BackendErrorInterface | null | undefined;
}
