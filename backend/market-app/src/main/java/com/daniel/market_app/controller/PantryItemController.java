package com.daniel.market_app.controller;

import com.daniel.market_app.dto.request.CreatePantryItemRequest;
import com.daniel.market_app.dto.response.PantryItemResponse;
import com.daniel.market_app.service.PantryItemService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class PantryItemController {

    private final PantryItemService pantryItemService;

    @GetMapping("/houses/{houseId}/pantry-items")
    public ResponseEntity<List<PantryItemResponse>> getPantryItems(
            @PathVariable UUID houseId
    ) {

        List<PantryItemResponse> response =
                pantryItemService.getByHouse(houseId);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/houses/{houseId}/pantry-items")
    public ResponseEntity<PantryItemResponse> createPantryItem(
            @PathVariable UUID houseId,
            @Valid @RequestBody CreatePantryItemRequest request
    ) {

        PantryItemResponse response =
                pantryItemService.create(houseId, request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @DeleteMapping("/houses/{houseId}/pantry-items/{pantryItemId}")
    public ResponseEntity<Void> deletePantryItem(
            @PathVariable UUID houseId,
            @PathVariable UUID pantryItemId
    ) {

        pantryItemService.delete(
                houseId,
                pantryItemId
        );

        return ResponseEntity.noContent().build();
    }

}