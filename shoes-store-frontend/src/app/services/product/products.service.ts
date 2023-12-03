import {Injectable} from '@angular/core';
import {envirnoment} from 'src/app/env/env';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../user/authentication.service';
import {RequestBaseServiceService} from '../request-base-service.service';
import {Observable} from 'rxjs';
import {ProductRecommendedInterface} from '../../guest/store/product/types/ProductInterface';
import {
  ProductInterface,
  RecommndedProductResponse,
  ReviewResponse,
} from 'src/app/guest/store/product/types/ProductInterface';
import {BackendSuccessResponseInterface} from 'src/app/types/BackendSuccessResponse.interface';

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

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${BASE_URL}/products/${id}`, {
      headers: this.getHeaders(),
    });
  }

  updateProduct(request: {
    id: number;
    productRequest: string;
    productImage: any;
  }): Observable<any> {
    const formData = new FormData();
    formData.append('productRequest', request.productRequest);
    formData.append('productFile', request.productImage);

    return this.http.put(`${BASE_URL}/products/${request.id}`, formData, {
      headers: this.getHeaders(),
    });
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

  addProduct(request: {
    productInfo: string;
    productImage: File;
  }): Observable<any> {
    const formData = new FormData();
    formData.append('productRequest', request.productInfo);
    formData.append('productImage', request.productImage);
    return this.http.post(`${BASE_URL}/products/add-product`, formData, {
      headers: this.getHeaders(),
    });
  }

  getRecommendationProducts(request: {
    pageNumber: number;
    pageSize: number;
    category?: string;
  }): Observable<any> {
    if (request.category) {
      return this.http.get(
        `${BASE_URL}/products/recommended?pageNumber=${request.pageNumber}&pageSize=${request.pageSize}&category=${request.category}`
      );
    } else {
      return this.http.get(
        `${BASE_URL}/products/recommended?pageNumber=${request.pageNumber}&pageSize=${request.pageSize}`
      );
    }
  }

  getRecommendationProductsByCategory(request: {
    limit: number;
    offset: number;
    category: string;
  }): Observable<any> {
    return this.http.get(
      `${BASE_URL}/products/recommended/${request.category}?offset=${request.offset}&limit=${request.limit}`
    );
  }

  productAddReview(
    payload: {rating: number; comment: string},
    productId: number
  ): Observable<any> {
    return this.http.post(`${BASE_URL}/reviews/${productId}`, payload, {
      headers: this.getHeaders(),
    });
  }

  getReview(id: number): Observable<any> {
    return this.http.get(`${BASE_URL}/reviews/review/${id}`);
  }

  updateReview(id: number, payload: Object): Observable<any> {
    return this.http.put(`${BASE_URL}/reviews/review/${id}`, payload, {
      headers: this.getHeaders(),
    });
  }
}
