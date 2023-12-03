package com.store.product.dao;

import com.store.product.dao.rowMapper.ProductReviewsRowMapper;
import com.store.product.dao.rowMapper.RecentProductUpdateRowMapper;
import com.store.product.dao.rowMapper.RecommendedProducts;
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
        var sql = "SELECT id, url,name,price,rating FROM products where stock >0 and updated_at notnull order by updated_at desc  LIMIT ? OFFSET ?";
        return jdbcTemplate.query(sql,new RecentProductUpdateRowMapper(),limit,offset);
    }

    @Override
    public float productAverageReview(long productId) {
        var sql = "SELECT  avg(review.rating) as product_rating FROM reviews review where review.product_id = ?";
        return jdbcTemplate.query(sql,new ProductReviewsRowMapper(),productId).get(0);
    }

    @Override
    public List<Product> recommendedProducts(int offset, int limit) {
        var sql = "select id, category, name, price, rating, url,rating,total_ratings from products where stock >0 order by created_at desc offset ? limit ?";
        return jdbcTemplate.query(sql,new RecommendedProducts(),offset,limit);
    }

    @Override
    public List<Product> recommendedProductsByCategory(String category,int offset, int limit) {
        var sql = "select id, category, name, price, rating, url,rating,total_ratings from products where stock >0 and category ilike ? order by created_at desc offset ? limit ?";
        return jdbcTemplate.query(sql,new RecommendedProducts(),category,offset,limit);
    }


}
