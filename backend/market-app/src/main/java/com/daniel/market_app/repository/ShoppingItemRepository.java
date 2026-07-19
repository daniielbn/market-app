package com.daniel.market_app.repository;


import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.daniel.market_app.domain.ShoppingItem;

public interface ShoppingItemRepository extends JpaRepository<ShoppingItem, UUID> {

    List<ShoppingItem> findAllByHouseIdAndDeletedAtIsNullOrderByCreatedAtAsc(UUID houseId);

    Optional<ShoppingItem> findByIdAndDeletedAtIsNull(UUID id);

    Optional<ShoppingItem> findByIdAndHouseIdAndDeletedAtIsNull(UUID id, UUID houseId);

}