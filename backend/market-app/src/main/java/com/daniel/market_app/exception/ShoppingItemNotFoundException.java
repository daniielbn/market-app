package com.daniel.market_app.exception;

import java.util.UUID;

public class ShoppingItemNotFoundException extends RuntimeException {

    public ShoppingItemNotFoundException(UUID shoppingItemId) {
        super("Shopping item not found with id: " + shoppingItemId);
    }

}