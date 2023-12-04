package com.store.product.dao.rowMapper;

import com.store.product.models.Product;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.lang.NonNull;

import java.sql.ResultSet;
import java.sql.SQLException;

public class RecentProductUpdateRowMapper implements RowMapper<Product> {
    @Override
    public Product mapRow(@NonNull ResultSet rs, int rowNum) throws SQLException {
        return Product.builder().id(rs.getLong("id")).url(rs.getString("url")).price(rs.getFloat("price")).name(rs.getString("name")).rating(rs.getInt("rating")).build();
    }
}
