package com.store.product.dao.rowMapper;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.lang.NonNull;

import java.sql.ResultSet;
import java.sql.SQLException;

public record ProductReviewsRowMapper() implements RowMapper<Float> {
    @Override
    public Float mapRow(@NonNull ResultSet rs, int rowNum) throws SQLException {
        return rs.getFloat("product_rating");
    }
}
