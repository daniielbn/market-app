package com.daniel.market_app.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateHouseRequest(

        @NotBlank
        @Size(max = 100)
        String name

) {
}