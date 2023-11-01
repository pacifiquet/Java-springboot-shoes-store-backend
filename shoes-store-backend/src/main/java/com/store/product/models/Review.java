package com.store.product.models;

import com.store.user.models.User;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Table(name = "reviews")
@Entity
public class Review {
    @Id
    @SequenceGenerator(name = "review_id_sequence", sequenceName = "review_id_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "review_id_sequence")
    private long id;
    @ManyToOne
    private Product productId;
    @ManyToOne
    private User userId;
    private float rating;
    private String comment;
    private LocalDateTime createdAt;
}
