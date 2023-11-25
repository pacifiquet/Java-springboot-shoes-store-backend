package com.store.product.services;

import com.amazonaws.services.s3.AmazonS3;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.store.config.AwsConfigProperties;
import com.store.exceptions.ProductException;
import com.store.exceptions.UserException;
import com.store.product.dao.IProductDao;
import com.store.product.dto.RecentUpdateProducts;
import com.store.product.dto.ProductAndRecommendedResponse;
import com.store.product.dto.ProductRequest;
import com.store.product.dto.ProductResponse;
import com.store.product.dto.ProductUpdateRequest;
import com.store.product.models.Product;
import com.store.product.repository.IProductRepository;
import com.store.product.utils.ProductUtils;
import com.store.user.models.Role;
import com.store.user.security.CustomerUserDetailsService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import static com.store.product.utils.Constants.FAILED_TO_DELETE_PRODUCTS;
import static com.store.product.utils.Constants.FAILED_TO_UPLOAD_PRODUCTS;
import static com.store.product.utils.Constants.PRODUCT_DELETED_SUCCESSFULLY;
import static com.store.product.utils.Constants.PRODUCT_NOT_FOUND;
import static com.store.product.utils.Constants.SUCCESSFULLY_ADDED_PRODUCT;
import static com.store.product.utils.Constants.SUCCESSFULLY_DELETED_PRODUCTS;
import static com.store.product.utils.Constants.SUCCESSFULLY_PRODUCT_UPLOADED;
import static com.store.product.utils.Constants.SUCCESSFULLY_UPDATED_PRODUCT;
import static com.store.utils.Constants.ACCESS_DENIED;
import static com.store.utils.Constants.ERROR;
import static com.store.utils.Constants.ROLE_PREFIX;
import static com.store.utils.Constants.SUCCESS;

@AllArgsConstructor
@Service
public class ProductService implements IProductService{

    private final IProductRepository productRepository;
    private final AmazonS3 amazonS3;
    private final AwsConfigProperties awsConfigProperties;
    private final ObjectMapper objectMapper;
    private final IProductDao productDao;
    @Override
    @Transactional
    public Map<String, String> uploadProductsCSV(MultipartFile fileProducts, CustomerUserDetailsService userDetailsService) {
        List<ProductRequest> productRequests = ProductUtils.productRequestListFile(fileProducts);
        if (!userDetailsService.getAuthorities().contains(new SimpleGrantedAuthority(ROLE_PREFIX + Role.ADMIN))){
            throw  new UserException(ACCESS_DENIED);
        }

        if (productRequests != null){
            List<Product> productList = productRequests.stream().map(productRequest -> ProductUtils.getProductRequestHandler().apply(productRequest,userDetailsService)).toList();
            productRepository.saveAll(productList);

            return Map.of(SUCCESS,SUCCESSFULLY_PRODUCT_UPLOADED);
        }

        return Map.of(ERROR,FAILED_TO_UPLOAD_PRODUCTS);
    }

    @Override
    @Transactional
    public Map<String, String> addProduct(ProductRequest productRequest, CustomerUserDetailsService customerUserDetailsService) {
        if (!customerUserDetailsService.getAuthorities().contains(new SimpleGrantedAuthority(ROLE_PREFIX + Role.ADMIN))) {
            throw new UserException(ACCESS_DENIED);
        }

        Product product = ProductUtils.getProductRequestHandler().apply(productRequest, customerUserDetailsService);
        productRepository.save(product);

        return Map.of(SUCCESS,SUCCESSFULLY_ADDED_PRODUCT);
    }

    @Override
    @Transactional
    public Map<String, String> updateProduct(long productId, Map<String,String> productRequest, CustomerUserDetailsService customerUserDetailsService, MultipartFile productFile) {
        Product product = productRepository.findById(productId).orElseThrow(()->new ProductException(PRODUCT_NOT_FOUND));
        ProductUpdateRequest productUpdateRequest;
        if (!customerUserDetailsService.getAuthorities().contains(new SimpleGrantedAuthority(ROLE_PREFIX+Role.ADMIN))){
            throw new UserException(ACCESS_DENIED);
        }
       try {
           String productData = objectMapper.writeValueAsString(productRequest);
           productUpdateRequest = objectMapper.readValue(productData, ProductUpdateRequest.class);
       } catch (JsonProcessingException e) {
           throw new RuntimeException(e);
       }

        String productUrl = ProductUtils.getProductUrl(productFile, product, amazonS3, awsConfigProperties);
        product.setUrl(productUrl);
        product.setName(productUpdateRequest.productName());
        product.setStock(productUpdateRequest.stock());
        product.setDescription(productUpdateRequest.description());
        product.setPrice(productUpdateRequest.price());
        product.setCategory(productUpdateRequest.category());
        product.setUpdatedAt(LocalDateTime.now());

        return Map.of(SUCCESS,SUCCESSFULLY_UPDATED_PRODUCT);
    }


    @Override
    public Page<ProductResponse> productList(int pageNumber,int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber,pageSize, Sort.by("createdAt").ascending());
        Page<Product> products = productRepository.findAll(pageable);
        return products.map(product -> ProductUtils.getProductResponseHandler().apply(product));

    }

    @Override
    public ProductResponse getProduct(long productId) {
        Product product = productRepository.findById(productId).orElseThrow(() -> new ProductException(PRODUCT_NOT_FOUND));
        return ProductUtils.getProductResponseHandler().apply(product);
    }

    @Override
    public Page<ProductResponse> productListByCategory(String category,int pageSize, int pageNumber) {
        Pageable pageable = PageRequest.of(pageNumber,pageSize, Sort.by("createdAt").descending());
        System.out.println(category);
        return productRepository.getProductListByCategory(pageable, category);
    }

    @Override
    public List<ProductResponse> searchProduct(String searchKey,int pageSize, int pageNumber) {
        Pageable pageable = PageRequest.of(pageNumber,pageSize, Sort.by("createdAt").ascending());
        Page<Product> productsByNameContainingIgnoreCase = productRepository.getProductsByNameContainingIgnoreCase(searchKey, pageable);
        return productsByNameContainingIgnoreCase.stream().map(product -> ProductUtils.getProductResponseHandler().apply(product)).toList();
    }

    @Override
    public List<ProductResponse> orderingProduct(String orderType, int pageSize, int pageNumber) {
        Pageable pageable;
        if (orderType.equalsIgnoreCase("desc")){
            pageable = PageRequest.of(pageNumber,pageSize, Sort.by("createdAt").descending());
        }else {
            pageable = PageRequest.of(pageNumber,pageSize, Sort.by("createdAt").ascending());
        }
        return productRepository.findAll(pageable).map(product -> ProductUtils.getProductResponseHandler().apply(product)).toList();
    }

    @Override
    @Transactional
    public Map<String, String> deleteProduct(long productId) {
        Product product = productRepository.findById(productId).orElseThrow(() -> new ProductException(PRODUCT_NOT_FOUND));
        productRepository.delete(product);
        return Map.of(SUCCESS,PRODUCT_DELETED_SUCCESSFULLY);
    }

    @Override
    public List<RecentUpdateProducts> recentlyUpdated(int limit, int offset) {
        return productDao.getRecentUpdateProducts(limit,offset).stream().map(product -> ProductUtils.getRecentProductResponseHandler().apply(product)).toList();
    }

    @Override
    public Map<String, String> deleteListOfProducts(List<Long> ids, CustomerUserDetailsService customerUserDetailsService) {
        if (!customerUserDetailsService.getAuthorities().contains(new SimpleGrantedAuthority(ROLE_PREFIX +Role.ADMIN))){
            throw new UserException(ACCESS_DENIED);
        }

        List<Product> productList = productRepository.findAllById(ids);
        if (!productList.isEmpty()){
            productRepository.deleteAllInBatch(productList);
            return Map.of(SUCCESS,SUCCESSFULLY_DELETED_PRODUCTS);
        }
        return Map.of(ERROR,FAILED_TO_DELETE_PRODUCTS);
    }

    @Override
    public ProductAndRecommendedResponse getProductAndRecommendedProducts(long productId, int pageSize, int pageNumber) {
        Product product = productRepository.findById(productId).orElseThrow(() -> new ProductException(PRODUCT_NOT_FOUND));
        Pageable pageable = PageRequest.of(pageNumber,pageSize,Sort.by("createdAt"));
        Page<ProductResponse> productListByCategory = productRepository.getProductListByCategory(pageable, product.getCategory());
        ProductResponse response = ProductUtils.getProductResponseHandler().apply(product);
        return new ProductAndRecommendedResponse(response,productListByCategory);

    }

    @Override
    public Page<ProductResponse> newArrivalProducts(int pageSize, int pageNumber) {
        Pageable pageable = PageRequest.of(pageNumber,pageSize,Sort.by("createdAt").descending());
        return productRepository.findAll(pageable).map(product -> ProductUtils.getProductResponseHandler().apply(product));
    }
}
