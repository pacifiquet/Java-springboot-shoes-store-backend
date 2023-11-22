package com.store.product.dto;

public record ProductRequest(
        int stock,
        String category,
        String productName,
        String productUrl,
        float price,
        String description
) {
}
