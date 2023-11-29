package com.store.product.dto;

public record ToRatedProductResponse(
        long id,

        float rating,
        String productName,
        String productUrl,
        float price
) {

}
