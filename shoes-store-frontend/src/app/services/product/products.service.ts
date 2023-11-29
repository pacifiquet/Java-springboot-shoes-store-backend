import {Injectable} from '@angular/core';
import {envirnoment} from 'src/app/env/env';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../user/authentication.service';
import {RequestBaseServiceService} from '../request-base-service.service';
import {Observable} from 'rxjs';
import {
  ProductInterface,
  RecommndedProductResponse,
  ReviewResponse,
} from 'src/app/guest/store/product/types/ProductInterface';

const BASE_URL = `${envirnoment.BASE_URL}`;

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends RequestBaseServiceService {
  reviewStarHandler: Array<number> = [];

  constructor(http: HttpClient, auth: AuthenticationService) {
    super(auth, http);
  }

  getAllProducts(pageSize: number, pageNumber: number): Observable<any> {
    return this.http.get(
      `${BASE_URL}/products?pageSize=${pageSize}&pageNumber=${pageNumber}`
    );
  }

  getTopSoldProducts(pageSize: number, pageNumber: number): Observable<any> {
    return this.http.get(
      `${BASE_URL}/products?pageSize=${pageSize}&pageNumber=${pageNumber}`
    );
  }

  deleteListOfProduct(ids: Array<number>): Observable<any> {
    return this.http.delete(
      `${BASE_URL}/products/delete-products?ids=${ids.join('&ids=')}`,
      {headers: this.getHeaders()}
    );
  }
  uploadProductList(products: File): Observable<any> {
    const formDate = new FormData();
    formDate.append('products', products);
    return this.http.post(BASE_URL + '/products/upload', formDate, {
      headers: this.getHeaders(),
    });
  }

  getProductDetails(request: {id: number}): Observable<ProductInterface> {
    return this.http.get(BASE_URL + '/products/' + request.id);
  }

  getProductDetailsAndRecommendation(request: {
    id: number;
    pageSize: number;
    pageNumber: number;
  }): Observable<any> {
    return this.http.get(
      `${BASE_URL}/products/${request.id}/recommendation?pageSize=${request.pageSize}&pageNumber=${request.pageNumber}`
    );
  }

  getRecentUpdateProducts(request: {
    limit: number;
    offset: number;
  }): Observable<any> {
    return this.http.get(
      `${BASE_URL}/products/recently-updated?limit=${request.limit}&offset=${request.offset}`
    );
  }

  getNewArrivalProducts(request: {
    pageSize: number;
    pageNumber: number;
  }): Observable<any> {
    return this.http.get(
      `${BASE_URL}/products/new-arrival?pageNumber=${request.pageNumber}&pageSize=${request.pageSize}`
    );
  }

  getProductsByCategory(request: {
    category: string;
    pageSize: number;
    pageNumber: number;
  }): Observable<any> {
    return this.http.get(
      `${BASE_URL}/products/product-by-category/${request.category}?pageSize=${request.pageSize}&pageNumber=${request.pageNumber}`
    );
  }

  getReviewsByProduct(request: {
    productId: number;
    pageSize: number;
    pageNumber: number;
  }): Observable<ReviewResponse> {
    return this.http.get(
      `${BASE_URL}/reviews/${request.productId}?pageNumber=${request.pageNumber}&pageSize=${request.pageSize}`
    );
  }

  getProductRecommendation(request: {
    productId: number;
    pageSize: number;
    pageNumber: number;
  }): Observable<RecommndedProductResponse> {
    return this.http.get(
      `${BASE_URL}/products/${request.productId}/recommendation?pageSize=${request.pageSize}&pageNumber=${request.pageNumber}`
    );
  }

  getTopTenRatedProducts(request: {
    limit: number;
    offset: number;
  }): Observable<any> {
    return this.http.get(
      `${BASE_URL}/products/top-ten-rated-products?offset=${request.offset}&limit=${request.limit}`
    );
  }
}
