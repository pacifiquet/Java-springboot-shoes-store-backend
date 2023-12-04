package com.store.product.dto;

public record ProductRecommendedResponse(
        long id,
        float rating,
        int totalRatings,
        String category,
        String productName,
        String productUrl,
        float price
) {
}
