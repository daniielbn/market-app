package com.daniel.market_app.service;

import java.util.List;
import java.util.UUID;

import com.daniel.market_app.dto.request.CreateProductRequest;
import com.daniel.market_app.dto.response.ProductResponse;

public interface ProductService {

    ProductResponse create(
        UUID houseId,
        CreateProductRequest request
    );

    List<ProductResponse> findAllByHouseId(
        UUID houseId
    );

    ProductResponse findById(
        UUID houseId,
        UUID productId
    );

    byte[] getImage(
        UUID houseId,
        UUID productId
    );

    void delete(
        UUID houseId,
        UUID productId
    );

}