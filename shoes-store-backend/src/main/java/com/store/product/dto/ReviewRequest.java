package com.store.product.dto;

public record ReviewRequest(
         float rating,
         String comment
) {
}
