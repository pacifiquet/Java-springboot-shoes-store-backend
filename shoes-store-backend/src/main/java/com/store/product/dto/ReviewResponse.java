package com.store.product.dto;

public record ReviewResponse(
         float rating,
         String comment,
         String createdAt,
         ReviewUserResponse reviewUserResponse
) {
}
