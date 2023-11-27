package com.store.product.services;

import com.store.exceptions.ProductException;
import com.store.exceptions.UserException;
import com.store.product.dao.ProductDao;
import com.store.product.dto.ReviewRequest;
import com.store.product.dto.ReviewResponse;
import com.store.product.models.Product;
import com.store.product.models.Review;
import com.store.product.repository.IProductRepository;
import com.store.product.repository.IReviewRepository;
import com.store.product.utils.ProductUtils;
import com.store.user.repository.IUserRepository;
import com.store.user.security.CustomerUserDetailsService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Objects;

import static com.store.product.utils.Constants.LOGIN_REQUIRED;
import static com.store.product.utils.Constants.PRODUCT_NOT_FOUND;

@Service
@AllArgsConstructor
public class ReviewService implements IReviewService{
    private final IReviewRepository reviewRepository;
    private final IProductRepository productRepository;
    private final IUserRepository userRepository;
    private final ProductDao productDao;

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

        product.setRating(productDao.productAverageReview(product.getId()));
        product.setTotalRatings(reviewRepository.getReviewByProduct(product).size());
        productRepository.save(product);
        return ProductUtils.reviewResponse().apply(savedReview);

    }
}
