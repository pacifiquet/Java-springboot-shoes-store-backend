package com.store.order.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
@Table(name = "orders")
@Entity
public class Order {
    @Id
    @SequenceGenerator(name = "order_id_sequence", sequenceName = "order_id_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "order_id_sequence")
    private long id;
    private long userId;
    private String paymentMethod;
    private float taxPrice;
    private float shippingPrice;
    private float totalPrice;
    private boolean isPaid;
    private LocalDateTime paidAt;
    private boolean isDelivered;
    private LocalDateTime createdAt;
}
