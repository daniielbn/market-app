package com.daniel.market_app.dto.request;

import java.util.UUID;

import jakarta.validation.constraints.Min;

public record CreateShoppingItemRequest(

        UUID productId,

        @Min(value = 1)
        Integer quantity,

        String comment
) {
}