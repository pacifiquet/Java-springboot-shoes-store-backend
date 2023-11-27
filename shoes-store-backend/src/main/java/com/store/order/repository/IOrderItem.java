package com.store.order.repository;

import com.store.order.models.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IOrderItem extends JpaRepository<OrderItem,Long> {
}
