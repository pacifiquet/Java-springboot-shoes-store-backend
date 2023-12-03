package com.store.product.services;

import com.store.exceptions.ProductException;
import com.store.exceptions.ReviewException;
import com.store.exceptions.UserException;
import com.store.product.dto.ReviewRequest;
import com.store.product.dto.ReviewResponse;
import com.store.product.models.Product;
import com.store.product.models.Review;
import com.store.product.repository.IProductRepository;
import com.store.product.repository.IReviewRepository;
import com.store.product.utils.ProductUtils;
import com.store.user.repository.IUserRepository;
import com.store.user.security.CustomerUserDetailsService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Objects;

import static com.store.product.utils.Constants.LOGIN_REQUIRED;
import static com.store.product.utils.Constants.PRODUCT_NOT_FOUND;
import static com.store.product.utils.Constants.REVIEW_NOT_FOUND;
import static com.store.product.utils.Constants.SUCCESSFULLY_ADDED_PRODUCT;
import static com.store.product.utils.Constants.SUCCESSFULLY_UPDATE_REVIEW;
import static com.store.utils.Constants.SUCCESS;

@Service
@AllArgsConstructor
public class ReviewService implements IReviewService{
    private final IReviewRepository reviewRepository;
    private final IProductRepository productRepository;
    private final IUserRepository userRepository;

    @Override
    @Transactional
    public ReviewResponse addReview(long productId, CustomerUserDetailsService userDetailsService, ReviewRequest reviewRequest) {
        if (Objects.isNull(userDetailsService)){
            throw new UserException(LOGIN_REQUIRED);
        }

        Product product = productRepository.findById(productId).orElseThrow(()->new ProductException(PRODUCT_NOT_FOUND));

        Review savedReview = reviewRepository.save(
                Review.builder()
                        .user(userRepository.getReferenceById(userDetailsService.getId()))
                        .product(product)
                        .comment(reviewRequest.comment())
                        .rating(reviewRequest.rating())
                        .createdAt(LocalDateTime.now()).build());

        float overAllRating = 5.0F;
        float totalRating = product.getTotalRatings();
        float newRating = reviewRequest.rating();
        float productAverageRating = ((overAllRating * totalRating) + newRating)/(totalRating+1);
        product.setRating(productAverageRating);
        product.setTotalRatings(reviewRepository.getReviewByProduct(product).size());
        productRepository.save(product);

        return ProductUtils.reviewResponse().apply(savedReview);

    }

    @Override
    public Page<ReviewResponse> reviewList(long productId,int pageNumber,int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber,pageSize, Sort.by("createdAt").descending());
        Product product = productRepository.getReferenceById(productId);
        return reviewRepository.getReviewByProduct(product,pageable).map(review -> ProductUtils.reviewResponse().apply(review));
    }

   @Override
   public ReviewResponse review(long id){
        return ProductUtils.reviewResponse().apply(reviewRepository.findById(id).orElseThrow(()-> new ReviewException(REVIEW_NOT_FOUND)));
   }

    @Override
    @Transactional
    public Map<String, String> updateReview(long id, CustomerUserDetailsService customerUserDetailsService, ReviewRequest reviewRequest) {
        if (Objects.isNull(customerUserDetailsService)){
            throw new UserException(LOGIN_REQUIRED);
        }
        Review review = reviewRepository.findById(id).orElseThrow(() -> new ReviewException(REVIEW_NOT_FOUND));
        review.setComment(reviewRequest.comment());
        review.setRating(reviewRequest.rating());
        reviewRepository.save(review);

        return Map.of(SUCCESS,SUCCESSFULLY_UPDATE_REVIEW);
    }


}
