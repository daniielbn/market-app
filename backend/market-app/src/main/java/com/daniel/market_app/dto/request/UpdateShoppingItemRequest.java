package com.daniel.market_app.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;

public record UpdateShoppingItemRequest(

        @Size(max = 150)
        String name,

        @Min(1)
        Integer quantity,

        Boolean purchased

) {
}