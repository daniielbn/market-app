package com.daniel.market_app.dto.response;

import java.util.UUID;

public record ShoppingItemResponse(

        UUID id,

        String name,

        Integer quantity,

        boolean purchased

) {
}