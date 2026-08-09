package com.daniel.market_app.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

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
@Table(name = "pantry_items")
public class PantryItem extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "house_id", nullable = false)
    private House house;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(name = "expiration_date", nullable = false)
    private LocalDate expirationDate;

    public PantryItem(
            House house,
            Product product,
            LocalDate expirationDate
    ) {

        this.house = house;
        this.product = product;
        this.expirationDate = expirationDate;

    }

}