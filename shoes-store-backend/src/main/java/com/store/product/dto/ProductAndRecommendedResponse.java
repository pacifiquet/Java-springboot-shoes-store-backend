package com.store.product.dto;

import org.springframework.data.domain.Page;

public record ProductAndRecommendedResponse(
        ProductResponse productResponse,
        Page<ProductResponse> recommendedProducts
) {
}
