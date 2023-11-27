package com.store.product.dao;

import com.store.product.models.Product;

import java.util.List;

public interface IProductDao {
    List<Product> getRecentUpdateProducts(int limit, int offset);
    float productAverageReview(long productId);
}
