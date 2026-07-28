package com.daniel.market_app.dto.response;

import java.util.UUID;

public record ShoppingItemResponse(

        UUID id,

        ProductItemResponse product,

        Integer quantity,

        boolean purchased,

        String comment

) {
}