package com.store.product.dto;

import java.util.List;

public record ProductAndReviewResponse(
        long id,
        int stock,
        float rating,
        String category,
        String productName,
        String productUrl,
        float price,
        String description,
        String createdAt,
        List<ReviewResponse> reviewResponses
) {
}
