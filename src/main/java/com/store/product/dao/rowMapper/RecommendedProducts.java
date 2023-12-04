package com.store.product.dao.rowMapper;

import com.store.product.models.Product;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.lang.NonNull;

import java.sql.ResultSet;
import java.sql.SQLException;

public class RecommendedProducts implements RowMapper<Product> {
    @Override
    public Product mapRow(@NonNull ResultSet rs, int rowNum) throws SQLException {
        return Product.builder()
                .id(rs.getLong("id"))
                .category(rs.getString("category"))
                .name(rs.getString("name"))
                .price(rs.getFloat("price"))
                .rating(rs.getFloat("rating"))
                .url(rs.getString("url"))
                .totalRatings(rs.getInt("total_ratings"))
                .build();
    }
}
