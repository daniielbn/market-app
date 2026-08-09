package com.daniel.market_app.dto.request;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.UUID;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreatePantryItemRequest {

    @NotNull
    private UUID productId;

    @NotNull
    @FutureOrPresent
    private LocalDate expirationDate;

}