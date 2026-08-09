package com.daniel.market_app.repository;

import com.daniel.market_app.domain.PantryItem;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PantryItemRepository extends JpaRepository<PantryItem, UUID> {

    List<PantryItem> findByHouseIdOrderByExpirationDateAsc(UUID houseId);

    Optional<PantryItem> findByIdAndHouseId(
            UUID pantryItemId,
            UUID houseId
    );

}