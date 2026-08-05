package com.daniel.market_app.dto.response;

import java.time.LocalDateTime;
import java.util.UUID;

public record ShoppingItemResponse(

        UUID id,

        ProductResponse product,

        Integer quantity,

        boolean purchased,

        String comment,

        LocalDateTime createdAt

) {
}