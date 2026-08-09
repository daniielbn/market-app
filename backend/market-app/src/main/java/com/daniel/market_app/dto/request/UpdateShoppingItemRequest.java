package com.daniel.market_app.dto.request;

import jakarta.validation.constraints.Min;

public record UpdateShoppingItemRequest(

        @Min(1)
        Integer quantity,

        Boolean purchased,

        String comment

) {
}