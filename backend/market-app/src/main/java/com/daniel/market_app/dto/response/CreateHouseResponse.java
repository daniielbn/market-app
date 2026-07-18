package com.daniel.market_app.dto.response;

import java.util.UUID;

public record CreateHouseResponse(

        UUID id,
        String name,
        String accessCode

) {
}