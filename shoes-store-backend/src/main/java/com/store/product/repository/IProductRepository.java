package com.store.product.repository;

import com.store.product.dto.ProductResponse;
import com.store.product.models.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface IProductRepository extends JpaRepository<Product, Long> {
    @Query("SELECT" +
            " NEW com.store.product.dto.ProductResponse(product.id, product.stock,product.rating,product.category,product.name,product.url,product.price,product.description,cast(product.createdAt as string) )"+
            "FROM Product product  WHERE product.category ILIKE :category"
    )
    Page<ProductResponse>getProductListByCategory(Pageable pageable, @Param(value = "category")String category);

//    @Query(
//            value = "SELECT NEW com.store.product.models.Product(product.id,product.userId, product.name,product.url,product.category,product.price,product.rating,product.stock,product.description,product.createdAt,product.updatedAt,product.reviews) FROM Product product"
//    )
@Query(nativeQuery = true, value = "select * from products p WHERE p.stock > 0 order by p.updated_at DESC LIMIT 10 OFFSET 0")
Page<Product> getTOpTenRecentUpdatedProducts(Pageable pageable);

    Page<Product> getProductsByNameContainingIgnoreCase(String name,Pageable pageable);
}
