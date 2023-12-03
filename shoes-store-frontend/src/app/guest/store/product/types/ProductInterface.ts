import {BackendErrorInterface} from 'src/app/types/backend.error.interface';

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
  unpaged: boolean;
}

export interface ProductRecommendedInterface {
  id?: number;
  rating?: number;
  totalRatings: number;
  category?: string;
  productName?: string;
  productUrl?: string;
  price?: number;
}
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

export interface ReviewInterface {
  id?: number;
  rating?: number;
  comment?: string;
  createdAt?: string;
  reviewUserResponse?: {
    firstName?: string;
    lastName?: string;
    profileImage?: string;
  };
}

export interface RecommndedProductResponse {
  content?: ProductInterface[];
  length?: number;
  size?: number;
  sort?: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  pageable?: Pageable | undefined | null;

  totalElements?: number;
  numberOfElements?: number;
  totalPages?: number;
  number?: number;
  last?: boolean;
  first?: boolean;
}

export interface ReviewResponse {
  content?: ReviewInterface[];
  length?: number;
  size?: number;
  sort?: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  pageable?: Pageable | undefined | null;

  totalElements?: number;
  numberOfElements?: number;
  totalPages?: number;
  number?: number;
  last?: boolean;
  first?: boolean;
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
