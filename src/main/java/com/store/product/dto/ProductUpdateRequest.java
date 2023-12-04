package com.store.product.dto;

public record ProductUpdateRequest(
        int stock,
        String category,
        String productName,
        float price,
        String description
) {
}
