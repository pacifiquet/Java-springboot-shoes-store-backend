import {BackendErrorInterface} from 'src/app/types/backend.error.interface';

export interface ProductInterface {
  id?: number;
  category?: string;
  stock?: number;
  rating?: number;
  productName?: string;
  productUrl?: string;
  price?: number;
  description?: string;
  createAt?: Date;
}

export interface RecentUpdateProductsResponse {
  id?: number;
  rating?: number;
  productName?: string;
  url?: string;
  price?: number;
}

interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  offset: number;
  paged: boolean;
}

export interface ContentResponse {
  content: ProductInterface[];
  length: number;
  pageable: Pageable;
  size: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  totalElements: number;
  totalPages: number;
  number: number;
  last: boolean;
  first: boolean;
}

export interface ProductAndRecommendationResponse {
  productResponse: ProductInterface;
  recommendedProducts: ContentResponse;
}

export interface ProductsStateStateInterface {
  isProductsLoaded: boolean;
  productList: ContentResponse | null | undefined;
  errors: BackendErrorInterface | null | undefined;
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
