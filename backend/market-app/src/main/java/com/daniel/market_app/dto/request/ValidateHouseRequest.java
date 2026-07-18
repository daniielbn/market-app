package com.daniel.market_app.dto.request;

import jakarta.validation.constraints.NotBlank;

public record ValidateHouseRequest(

        @NotBlank
        String accessCode

) {
}