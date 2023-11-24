package com.store.product.models;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Table(name = "products")
@Entity(name = "Product")
public class Product {
    @Id
    @SequenceGenerator(name = "product_id_sequence", sequenceName = "product_id_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "product_id_sequence")
    private long id;
    private long userId;
    private String name;
    @Column(columnDefinition = "TEXT",length = 500)
    private String url;
    private String category;
    private float price;
    private int rating;
    private int stock;
    @Column(columnDefinition = "TEXT",length = 700)
    private String description;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    @OneToMany(cascade = CascadeType.ALL)
    private Set<Review> reviews;


    public Product(String name, String url, float price, int rating) {}
}
