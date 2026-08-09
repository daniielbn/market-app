package com.daniel.market_app.dto.response;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PantryItemResponse {

    private UUID id;

    private UUID productId;

    private String productName;

    private byte[] productImage;

    private LocalDate expirationDate;

    private LocalDateTime createdAt;

}