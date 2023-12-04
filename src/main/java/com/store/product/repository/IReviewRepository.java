package com.store.product.repository;

import com.store.product.models.Product;
import com.store.product.models.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IReviewRepository extends JpaRepository<Review,Long> {
    Page<Review> getReviewByProduct(Product product, Pageable pageable);
    List<Review> getReviewByProduct(Product product);
}
