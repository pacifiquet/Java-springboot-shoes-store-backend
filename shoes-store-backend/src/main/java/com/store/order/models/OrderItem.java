package com.store.order.models;

import com.store.product.models.Product;
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

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Table(name = "order-items")
@Entity
public class OrderItem {
    @Id
    @SequenceGenerator(name = "orderItem_id_sequence", sequenceName = "orderItem_id_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "orderItem_id_sequence")
    private long id;
    @ManyToOne
    private Product productId;
    @ManyToOne
    private Order orderId;
    private int quantity;
    private float price;
}
