package com.daniel.market_app.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.daniel.market_app.domain.House;
import com.daniel.market_app.domain.Product;
import com.daniel.market_app.domain.ShoppingItem;
import com.daniel.market_app.dto.request.CreateShoppingItemRequest;
import com.daniel.market_app.dto.request.UpdateShoppingItemRequest;
import com.daniel.market_app.dto.response.ShoppingItemResponse;
import com.daniel.market_app.exception.HouseNotFoundException;
import com.daniel.market_app.exception.ProductNotFoundException;
import com.daniel.market_app.exception.ShoppingItemNotFoundException;
import com.daniel.market_app.mapper.ShoppingItemMapper;
import com.daniel.market_app.repository.HouseRepository;
import com.daniel.market_app.repository.ProductRepository;
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
    private final ProductRepository productRepository;
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
        Product product = getProduct(houseId, request.productId());

        ShoppingItem shoppingItem = new ShoppingItem();
        shoppingItem.setHouse(house);
        shoppingItem.setProduct(product);
        shoppingItem.setQuantity(request.quantity());
        shoppingItem.setComment(request.comment());
        shoppingItem.setPurchased(false);

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

        if (request.quantity() != null) {
            shoppingItem.setQuantity(request.quantity());
        }

        if (request.purchased() != null) {
            shoppingItem.setPurchased(request.purchased());
        }

        if (request.comment() != null) {
            shoppingItem.setComment(request.comment());
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

    private Product getProduct(UUID houseId, UUID productId) {
        return productRepository.findByIdAndHouseId(productId, houseId)
                .orElseThrow(() -> new ProductNotFoundException(productId));
    }

    @Override
    @Transactional
    public void deleteAllByHouseId(UUID houseId) {

        shoppingItemRepository.deleteAllByHouseId(houseId);

    }

}
