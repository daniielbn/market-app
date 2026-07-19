package com.daniel.market_app.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.daniel.market_app.dto.request.CreateShoppingItemRequest;
import com.daniel.market_app.dto.request.UpdateShoppingItemRequest;
import com.daniel.market_app.dto.response.ShoppingItemResponse;
import com.daniel.market_app.service.ShoppingItemService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class ShoppingItemController {

    private final ShoppingItemService shoppingItemService;

    @GetMapping("/houses/{houseId}/shopping-items")
    public List<ShoppingItemResponse> getShoppingItems(
            @PathVariable UUID houseId) {

        return shoppingItemService.getShoppingItems(houseId);
    }

    @PostMapping("/houses/{houseId}/shopping-items")
    @ResponseStatus(HttpStatus.CREATED)
    public ShoppingItemResponse createShoppingItem(
            @PathVariable UUID houseId,
            @Valid @RequestBody CreateShoppingItemRequest request) {

        return shoppingItemService.createShoppingItem(houseId, request);
    }

    @PatchMapping("/shopping-items/{shoppingItemId}")
    public ShoppingItemResponse updateShoppingItem(
            @PathVariable UUID shoppingItemId,
            @Valid @RequestBody UpdateShoppingItemRequest request) {

        return shoppingItemService.updateShoppingItem(shoppingItemId, request);
    }

    @DeleteMapping("/shopping-items/{shoppingItemId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteShoppingItem(
            @PathVariable UUID shoppingItemId) {

        shoppingItemService.deleteShoppingItem(shoppingItemId);
    }

}