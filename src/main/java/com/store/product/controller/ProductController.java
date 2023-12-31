package com.store.product.controller;

import com.store.product.dto.ProductRecommendedResponse;
import com.store.product.dto.ProductResponse;
import com.store.product.dto.RecentUpdateProducts;
import com.store.product.dto.ToRatedProductResponse;
import com.store.product.services.IProductService;
import com.store.user.security.CustomerUserDetailsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/products")
@AllArgsConstructor
@Tag(name = "Product Controller")
public class ProductController {
    private final IProductService productService;

    @GetMapping
    @Operation(summary = "product List")
    ResponseEntity<Page<ProductResponse>>productList(@RequestParam int pageSize,int pageNumber){
        return ResponseEntity.ok(productService.productList(pageNumber,pageSize));
    }

    @GetMapping(value = "recommended")
    @Operation(summary = "recommended Products")
    ResponseEntity<Page<ProductRecommendedResponse>> getRecommendationProducts(@RequestParam(value = "pageNumber") int pageNumber, @RequestParam(value = "pageSize") int pageSize,@RequestParam(value = "category",required = false)String category){
        return ResponseEntity.ok(productService.productRecommendation(pageNumber,pageSize,category));
    }
    @GetMapping(value = "recommended/{category}")
    @Operation(summary = "Filter products recommended by category")
    ResponseEntity<List<ProductRecommendedResponse>> recommendedProductsByCategory(@PathVariable String category,@RequestParam int offset,int limit){
        return ResponseEntity.ok(productService.recommendedProductsByCategory(category,offset,limit));
    }

    @GetMapping(value = "recently-updated")
    @Operation(summary = "recently updated products")
    ResponseEntity<List<RecentUpdateProducts>> recentlyUpdated(@RequestParam("limit") int limit, @RequestParam("offset") int offset){
        return ResponseEntity.ok(productService.recentlyUpdated(limit,offset));
    }

    @GetMapping(value = "/product-by-category/{category}")
    @Operation(summary = "get product list by category")
    ResponseEntity<Page<ProductResponse>> getProductByCategory(@PathVariable String category, @RequestParam int pageSize, @RequestParam int pageNumber){
        return ResponseEntity.ok(productService.productListByCategory(category,pageNumber,pageSize));
    }

    @GetMapping(value = "/search-by-name")
    @Operation(summary = "search product by name")
    ResponseEntity<List<ProductResponse>> searchProductByName(@RequestParam String searchKey,@RequestParam int pageSize, @RequestParam int pageNumber){
        return ResponseEntity.ok(productService.searchProduct(searchKey,pageNumber,pageSize));
    }

    @GetMapping(value = "/ordering-product/{orderType}")
    @Operation(summary = "Ordering product by asc or desc")
    ResponseEntity<List<ProductResponse>> productsOrderingByAscOrDesc(@PathVariable String orderType,@RequestParam int pageSize, @RequestParam int pageNumber){
        return ResponseEntity.ok(productService.orderingProduct(orderType,pageNumber,pageSize));
    }
    @GetMapping(value = "{productId}")
    @Operation(summary = "get Product by ID")
    ResponseEntity<ProductResponse> getProductById(@PathVariable long productId){
        return ResponseEntity.ok(productService.getProduct(productId));
    }

    @PostMapping(value = "/upload",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "upload products with csv file")
    ResponseEntity<Map<String,String>>uploadProductCSV(@RequestPart(value = "products") final MultipartFile products, @AuthenticationPrincipal CustomerUserDetailsService userDetailsService){
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.uploadProductsCSV(products,userDetailsService));
    }
    @PostMapping(value = "/add-product",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Add a single product")
    ResponseEntity<Map<String,String>> addProduct(@RequestPart(value = "productImage") final MultipartFile productImage, @RequestParam(value = "productRequest") String productRequest, @AuthenticationPrincipal CustomerUserDetailsService customerUserDetailsService ){
        return ResponseEntity.ok(productService.addProduct(productRequest,productImage,customerUserDetailsService));
    }

    @PutMapping(value = "/{productId}",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Update Product")
    ResponseEntity<Map<String,String>>updateProduct(@RequestPart(required = false) MultipartFile productFile, @RequestParam(value = "productRequest") String productRequest, @PathVariable(name = "productId")long productId, @AuthenticationPrincipal CustomerUserDetailsService customerUserDetailsService){
        return ResponseEntity.ok(productService.updateProduct(productId,productRequest,customerUserDetailsService,productFile));
    }

    @DeleteMapping(value = "/{productId}")
    @Operation(summary = "delete Product")
    ResponseEntity<Map<String,String>> deleteProduct(@PathVariable long productId){
        return ResponseEntity.ok(productService.deleteProduct(productId));
    }

    @DeleteMapping(value = "delete-products")
    @Operation(summary = "deleting list of products")
    ResponseEntity<Map<String,String>> deleteProducts(@RequestParam(value = "ids") List<Long> ids,@AuthenticationPrincipal CustomerUserDetailsService customerUserDetailsService){
        return ResponseEntity.ok(productService.deleteListOfProducts(ids,customerUserDetailsService));
    }

    @GetMapping(value = "/{productId}/recommendation")
    @Operation(summary = "get a product and recommended products")
    ResponseEntity<Page<ProductResponse>> getProductAndRecommendedProduct(@PathVariable long productId,@RequestParam int pageSize, @RequestParam int pageNumber){
        return ResponseEntity.ok(productService.getProductAndRecommendedProducts(productId,pageSize,pageNumber));
    }



    @GetMapping(value = "/new-arrival")
    @Operation(summary = "new arrival products")
    ResponseEntity<Page<ProductResponse>> getNewArrivalProducts(@RequestParam("pageNumber")int pageNumber,@RequestParam("pageSize")int pageSize){
        return ResponseEntity.ok(productService.newArrivalProducts(pageSize,pageNumber));
    }

    @GetMapping(value = "/top-ten-rated-products")
    @Operation(summary = "Top Ten rated products")
    ResponseEntity<List<ToRatedProductResponse>> topTenRatedProduct(@RequestParam int offset, @RequestParam int limit){
        return ResponseEntity.ok(productService.topTenRatedProducts(offset,limit));
    }
}
