package com.daniel.market_app.exception;

public class HouseNotFoundException extends RuntimeException {

    public HouseNotFoundException(String accessCode) {
        super("House not found with access code: " + accessCode);
    }

}
