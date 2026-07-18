package com.daniel.market_app.service;


import java.util.List;
import java.util.UUID;

import com.daniel.market_app.dto.request.CreateShoppingItemRequest;
import com.daniel.market_app.dto.request.UpdateShoppingItemRequest;
import com.daniel.market_app.dto.response.ShoppingItemResponse;

public interface ShoppingItemService {

    List<ShoppingItemResponse> getShoppingItems(UUID houseId);

    ShoppingItemResponse createShoppingItem(UUID houseId, CreateShoppingItemRequest request);

    ShoppingItemResponse updateShoppingItem(UUID shoppingItemId,
                                            UpdateShoppingItemRequest request);

    void deleteShoppingItem(UUID shoppingItemId);

}