package com.store.order.models;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
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
@Table(name = "shippingAddress")
public class ShippingAddress {
    @Id
    @SequenceGenerator(sequenceName = "shippingAddress_id_sequence", name = "shippingAddress_id_sequence")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "shippingAddress_id_sequence")
    private long id;
    private String address;
    private String city;
    private String postalCode;
    private String country;
    private float shippingPrice;
    @OneToOne
    private OrderItem orderItem;
}
