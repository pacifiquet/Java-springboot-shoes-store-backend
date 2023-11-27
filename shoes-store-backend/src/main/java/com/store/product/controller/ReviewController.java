package com.store.product.controller;

import com.store.product.dto.ReviewRequest;
import com.store.product.dto.ReviewResponse;
import com.store.product.services.IReviewService;
import com.store.user.security.CustomerUserDetailsService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/v1/reviews/")
@AllArgsConstructor
public class ReviewController {
    private final IReviewService reviewService;
    @PostMapping(value = "{productId}")
    @Operation(summary = "add product review")
    ResponseEntity<ReviewResponse> addProductReview(@PathVariable long productId, @RequestBody ReviewRequest reviewRequest, @AuthenticationPrincipal CustomerUserDetailsService userDetailsService){
        return ResponseEntity.status(HttpStatus.CREATED).body(reviewService.addReview(productId,userDetailsService,reviewRequest));
    }
}
