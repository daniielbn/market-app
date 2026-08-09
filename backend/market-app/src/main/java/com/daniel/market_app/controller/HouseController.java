package com.daniel.market_app.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.daniel.market_app.dto.request.CreateHouseRequest;
import com.daniel.market_app.dto.request.ValidateHouseRequest;
import com.daniel.market_app.dto.response.CreateHouseResponse;
import com.daniel.market_app.dto.response.ValidateHouseResponse;
import com.daniel.market_app.service.HouseService;

@RestController
@RequestMapping("/api/v1/houses")
@RequiredArgsConstructor
public class HouseController {

    private final HouseService houseService;

    @PostMapping
    public ResponseEntity<CreateHouseResponse> createHouse(
            @Valid @RequestBody CreateHouseRequest request) {

        CreateHouseResponse response = houseService.createHouse(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PostMapping("/validate")
    public ResponseEntity<ValidateHouseResponse> validateAccessCode(
            @Valid @RequestBody ValidateHouseRequest request) {

        ValidateHouseResponse response =
                houseService.validateAccessCode(request);

        return ResponseEntity.ok(response);
    }

}