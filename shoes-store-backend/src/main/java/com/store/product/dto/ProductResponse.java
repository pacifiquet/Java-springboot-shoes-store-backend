package com.store.product.dto;

public record ProductResponse(
        long id,
        int stock,
        float rating,
        String category,
        String productName,
        String productUrl,
        float price,
        String description,
        String createdAt
) {
}
