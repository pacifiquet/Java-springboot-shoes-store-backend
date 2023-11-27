package com.store.product.services;

import com.store.product.dto.ReviewRequest;
import com.store.product.dto.ReviewResponse;
import com.store.user.security.CustomerUserDetailsService;

public interface IReviewService {
    ReviewResponse addReview(long productId, CustomerUserDetailsService userDetailsService, ReviewRequest reviewRequest);
}
