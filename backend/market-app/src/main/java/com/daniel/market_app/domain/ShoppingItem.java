package com.daniel.market_app.domain;

import lombok.AccessLevel;
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
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "shopping_items")
public class ShoppingItem extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "house_id", nullable = false)
    private House house;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(nullable = false)
    private Integer quantity;

    @Column(nullable = false)
    private boolean purchased;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    public ShoppingItem(House house,
                        String name,
                        Integer quantity) {

        this.house = house;
        this.name = name;
        this.quantity = quantity;
        this.purchased = false;
    }

}