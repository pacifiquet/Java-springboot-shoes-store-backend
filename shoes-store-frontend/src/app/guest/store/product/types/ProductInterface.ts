import {BackendErrorInterface} from 'src/app/types/backend.error.interface';

export interface ProductResponseInterface {
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

export interface ProductStateStateInterface {
  isProductsLoaded: boolean;
  productList: Array<ProductResponseInterface> | null | undefined;
  errors: BackendErrorInterface | null | undefined;
}
