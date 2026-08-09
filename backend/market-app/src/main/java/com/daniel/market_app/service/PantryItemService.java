package com.daniel.market_app.service;

import com.daniel.market_app.dto.request.CreatePantryItemRequest;
import com.daniel.market_app.dto.response.PantryItemResponse;

import java.util.List;
import java.util.UUID;

public interface PantryItemService {

    List<PantryItemResponse> getByHouse(UUID houseId);

    PantryItemResponse create(
            UUID houseId,
            CreatePantryItemRequest request
    );

    void delete(
            UUID houseId,
            UUID pantryItemId
    );

}