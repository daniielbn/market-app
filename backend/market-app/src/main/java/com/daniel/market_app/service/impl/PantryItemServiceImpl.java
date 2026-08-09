package com.daniel.market_app.service.impl;

import com.daniel.market_app.domain.House;
import com.daniel.market_app.domain.PantryItem;
import com.daniel.market_app.domain.Product;
import com.daniel.market_app.dto.request.CreatePantryItemRequest;
import com.daniel.market_app.dto.response.PantryItemResponse;
import com.daniel.market_app.repository.HouseRepository;
import com.daniel.market_app.repository.PantryItemRepository;
import com.daniel.market_app.repository.ProductRepository;
import com.daniel.market_app.service.PantryItemService;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class PantryItemServiceImpl implements PantryItemService {

    private final PantryItemRepository pantryItemRepository;
    private final HouseRepository houseRepository;
    private final ProductRepository productRepository;

    @Override
    @Transactional(readOnly = true)
    public List<PantryItemResponse> getByHouse(UUID houseId) {

        return pantryItemRepository
                .findByHouseIdOrderByExpirationDateAsc(houseId)
                .stream()
                .map(this::toResponse)
                .toList();

    }

    @Override
    public PantryItemResponse create(
            UUID houseId,
            CreatePantryItemRequest request
    ) {

        House house = houseRepository
                .findById(houseId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "House not found: " + houseId
                        )
                );

        Product product = productRepository
                .findByIdAndHouseId(
                        request.getProductId(),
                        houseId
                )
                .orElseThrow(() ->
                        new RuntimeException(
                                "Product not found in house: "
                                        + request.getProductId()
                        )
                );

        PantryItem pantryItem = new PantryItem(
                house,
                product,
                request.getExpirationDate()
        );

        PantryItem savedItem =
                pantryItemRepository.save(pantryItem);

        return toResponse(savedItem);

    }

    @Override
    public void delete(
            UUID houseId,
            UUID pantryItemId
    ) {

        PantryItem pantryItem =
                pantryItemRepository
                        .findByIdAndHouseId(
                                pantryItemId,
                                houseId
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Pantry item not found in house: "
                                                + pantryItemId
                                )
                        );

        pantryItemRepository.delete(pantryItem);
}
    private PantryItemResponse toResponse(
            PantryItem pantryItem
    ) {

        Product product = pantryItem.getProduct();

        return new PantryItemResponse(
                pantryItem.getId(),
                product.getId(),
                product.getName(),
                product.getImage(),
                pantryItem.getExpirationDate(),
                pantryItem.getCreatedAt()
        );

    }

}