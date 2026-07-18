package com.daniel.market_app.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.daniel.market_app.domain.House;
import com.daniel.market_app.domain.ShoppingItem;
import com.daniel.market_app.dto.request.CreateShoppingItemRequest;
import com.daniel.market_app.dto.request.UpdateShoppingItemRequest;
import com.daniel.market_app.dto.response.ShoppingItemResponse;
import com.daniel.market_app.exception.HouseNotFoundException;
import com.daniel.market_app.exception.ShoppingItemNotFoundException;
import com.daniel.market_app.mapper.ShoppingItemMapper;
import com.daniel.market_app.repository.HouseRepository;
import com.daniel.market_app.repository.ShoppingItemRepository;
import com.daniel.market_app.service.ShoppingItemService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ShoppingItemServiceImpl implements ShoppingItemService {

    private final ShoppingItemRepository shoppingItemRepository;
    private final HouseRepository houseRepository;
    private final ShoppingItemMapper shoppingItemMapper;

    @Override
    public List<ShoppingItemResponse> getShoppingItems(UUID houseId) {

        getHouse(houseId);

        return shoppingItemRepository
                .findAllByHouseIdAndDeletedAtIsNullOrderByCreatedAtAsc(houseId)
                .stream()
                .map(shoppingItemMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional
    public ShoppingItemResponse createShoppingItem(
            UUID houseId,
            CreateShoppingItemRequest request) {

        House house = getHouse(houseId);

        ShoppingItem shoppingItem = new ShoppingItem(
                house,
                request.name(),
                request.quantity()
        );

        ShoppingItem savedShoppingItem =
                shoppingItemRepository.save(shoppingItem);

        return shoppingItemMapper.toResponse(savedShoppingItem);
    }

    @Override
    @Transactional
    public ShoppingItemResponse updateShoppingItem(
            UUID shoppingItemId,
            UpdateShoppingItemRequest request) {

        ShoppingItem shoppingItem = getShoppingItem(shoppingItemId);

        if (request.name() != null) {
            shoppingItem.setName(request.name());
        }

        if (request.quantity() != null) {
            shoppingItem.setQuantity(request.quantity());
        }

        if (request.purchased() != null) {
            shoppingItem.setPurchased(request.purchased());
        }

        return shoppingItemMapper.toResponse(shoppingItem);
    }

    @Override
    @Transactional
    public void deleteShoppingItem(UUID shoppingItemId) {

        ShoppingItem shoppingItem = getShoppingItem(shoppingItemId);

        shoppingItem.setDeletedAt(LocalDateTime.now());
    }

    private House getHouse(UUID houseId) {
        return houseRepository.findById(houseId)
                .orElseThrow(() -> new HouseNotFoundException(houseId));
    }

    private ShoppingItem getShoppingItem(UUID shoppingItemId) {
        return shoppingItemRepository.findByIdAndDeletedAtIsNull(shoppingItemId)
                .orElseThrow(() -> new ShoppingItemNotFoundException(shoppingItemId));
    }

}
