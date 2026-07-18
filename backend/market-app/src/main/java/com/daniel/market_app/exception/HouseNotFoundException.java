package com.daniel.market_app.exception;

import java.util.UUID;

public class HouseNotFoundException extends RuntimeException {

    public HouseNotFoundException(String accessCode) {
        super("House not found with access code: " + accessCode);
    }

    public HouseNotFoundException(UUID houseId) {
        super("House not found with id: " + houseId);
    }

}