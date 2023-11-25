package com.store.product.services;

import com.store.product.dto.RecentUpdateProducts;
import com.store.product.dto.ProductAndRecommendedResponse;
import com.store.product.dto.ProductRequest;
import com.store.product.dto.ProductResponse;
import com.store.user.security.CustomerUserDetailsService;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface IProductService {
    Map<String,String> uploadProductsCSV(MultipartFile products, CustomerUserDetailsService userDetailsService);

    Map<String, String> addProduct(ProductRequest productRequest, CustomerUserDetailsService customerUserDetailsService);

    Map<String, String> updateProduct(long productId, Map<String,String> productRequest, CustomerUserDetailsService customerUserDetailsService, MultipartFile productFile);

    Page<ProductResponse> productList(int pageSize, int pageNumber);


    ProductResponse getProduct(long productId);

    Page<ProductResponse> productListByCategory(String category,int pageSize, int pageNumber);

    List<ProductResponse> searchProduct(String searchKey,int pageSize, int pageNumber);

    List<ProductResponse> orderingProduct(String orderType, int pageSize, int pageNumber);

    Map<String, String> deleteProduct(long productId);

    List<RecentUpdateProducts> recentlyUpdated(int limit, int offset);


    Map<String, String> deleteListOfProducts(List<Long> ids, CustomerUserDetailsService customerUserDetailsService);


    ProductAndRecommendedResponse getProductAndRecommendedProducts(long productId, int pageSize, int pageNumber);
    Page<ProductResponse>newArrivalProducts(int pageSize,int pageNumber);
}
