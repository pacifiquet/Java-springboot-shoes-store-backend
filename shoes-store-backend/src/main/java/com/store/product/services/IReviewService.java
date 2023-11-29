package com.store.product.services;

import com.store.product.dto.ReviewRequest;
import com.store.product.dto.ReviewResponse;
import com.store.user.security.CustomerUserDetailsService;
import org.springframework.data.domain.Page;

public interface IReviewService {
    ReviewResponse addReview(long productId, CustomerUserDetailsService userDetailsService, ReviewRequest reviewRequest);
    Page<ReviewResponse> reviewList(long productId,int pageNumber,int pageSize);
}
