package com.store.product.dto;

public record RecentUpdateProducts(
        long id,
        float rating,
        String productName,
        String productUrl,
        float price

) {
}
