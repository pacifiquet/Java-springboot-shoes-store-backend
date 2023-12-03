package com.store.product.repository;

import com.store.product.dto.ProductRecommendedResponse;
import com.store.product.dto.ProductResponse;
import com.store.product.models.Product;
import com.store.product.models.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IProductRepository extends JpaRepository<Product, Long> {
    @Query("SELECT" +
            " NEW com.store.product.dto.ProductResponse(product.id, product.stock,product.rating,product.totalRatings,product.category,product.name,product.url,product.price,product.description,cast(product.createdAt as string) )"+
            "FROM Product product  WHERE product.category ILIKE :category"
    )
    Page<ProductResponse>getProductListByCategory(Pageable pageable, @Param(value = "category")String category);
    @Query("SELECT" +
            " NEW com.store.product.dto.ProductRecommendedResponse(product.id,product.rating,product.totalRatings,product.category,product.name,product.url,product.price )"+
            "FROM Product product  WHERE product.category ILIKE :category"
    )
    Page<ProductRecommendedResponse> getRecommendationProductsByCategory(Pageable pageable,@Param(value = "category")String category);


    Page<Product> getProductsByNameContainingIgnoreCase(String name,Pageable pageable);
    @Query("SELECT" +
            " NEW com.store.product.dto.ProductResponse(product.id, product.stock,product.rating,product.totalRatings,product.category,product.name,product.url,product.price,product.description,cast(product.createdAt as string) )"+
            "FROM Product product  WHERE product.category ILIKE :category AND product.id <> :id"
    )
    Page<ProductResponse> getProductRecommendation(@Param(value = "category")String category,@Param("id") long id,Pageable pageable);

    @Query(value = "SELECT" +
            " * "+
            "FROM products product order by product.rating desc offset ? limit ?",nativeQuery = true
    )
    List<Product> topTenRatedProduct(@Param("offset") int offset, @Param("limit") int limit);
}
