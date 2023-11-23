import {BackendErrorInterface} from 'src/app/types/backend.error.interface';

interface Product {
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
  content: Product[];
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

export interface ProductStateStateInterface {
  isProductsLoaded: boolean;
  productList: ContentResponse | null | undefined;
  errors: BackendErrorInterface | null | undefined;
}
