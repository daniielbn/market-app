package com.daniel.market_app.dto.response;

import java.util.UUID;

public record ValidateHouseResponse(

        UUID houseId,
        String houseName

) {
}