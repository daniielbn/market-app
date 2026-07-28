package com.daniel.market_app.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "shopping_items")
public class ShoppingItem extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "house_id", nullable = false)
    private House house;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(nullable = false)
    private Integer quantity;

    @Column(nullable = false)
    private boolean purchased;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    @Column(name = "comment", length = 500)
    private String comment;

    public ShoppingItem(House house,
                        Integer quantity,
                        String comment
                        ) {

        this.house = house;
        this.quantity = quantity;
        this.purchased = false;
        this.comment = comment;
    }

}