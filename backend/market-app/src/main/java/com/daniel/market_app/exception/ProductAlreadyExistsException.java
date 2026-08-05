package com.daniel.market_app.exception;

import java.util.UUID;

public class ProductAlreadyExistsException extends RuntimeException {

    public ProductAlreadyExistsException(UUID houseId, String productName) {
        super("Product already exists in house " + houseId + ": " + productName);
    }

}