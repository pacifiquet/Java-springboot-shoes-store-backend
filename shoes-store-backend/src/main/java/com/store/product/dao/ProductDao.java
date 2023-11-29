package com.store.product.dao;

import com.store.product.dao.rowMapper.ProductReviewsRowMapper;
import com.store.product.dao.rowMapper.RecentProductUpdateRowMapper;
import com.store.product.models.Product;
import lombok.AllArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@AllArgsConstructor
@Repository
public class ProductDao implements IProductDao{
    private final JdbcTemplate jdbcTemplate;
    @Override
    public List<Product> getRecentUpdateProducts(int limit,int offset) {
        var sql = "SELECT p.id, p.url,p.name,p.price,p.rating FROM products p WHERE p.stock > 0 ORDER BY p.updated_at DESC LIMIT ? OFFSET ?";
        return jdbcTemplate.query(sql,new RecentProductUpdateRowMapper(),limit,offset);
    }

    @Override
    public float productAverageReview(long productId) {
        var sql = "SELECT  avg(review.rating) as product_rating FROM reviews review where review.product_id = ?";
        return jdbcTemplate.query(sql,new ProductReviewsRowMapper(),productId).get(0);
    }


}
