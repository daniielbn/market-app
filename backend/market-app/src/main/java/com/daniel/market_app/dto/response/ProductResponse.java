package com.daniel.market_app.dto.response;

import java.time.LocalDateTime;
import java.util.UUID;

public record ProductResponse(

        UUID id,

        String name,

        String image,

        LocalDateTime createdAt

) {
}
