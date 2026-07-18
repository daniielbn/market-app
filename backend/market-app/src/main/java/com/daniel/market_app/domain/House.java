package com.daniel.market_app.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "houses")
public class House extends BaseEntity {

    @Column(nullable = false, length = 100)
    private String name;

    @Column(name = "access_code", nullable = false, unique = true, length = 20)
    private String accessCode;

    public House(String name, String accessCode) {
        this.name = name;
        this.accessCode = accessCode;
    }

}