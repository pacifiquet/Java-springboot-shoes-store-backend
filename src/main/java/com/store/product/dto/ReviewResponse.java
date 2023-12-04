package com.store.product.dto;

public record ReviewResponse(
        long id,
         float rating,
         String comment,
         String createdAt,
         ReviewUserResponse reviewUserResponse
) {
}
