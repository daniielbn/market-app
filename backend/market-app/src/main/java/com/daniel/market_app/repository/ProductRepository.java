package com.daniel.market_app.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import com.daniel.market_app.domain.Product;

public interface ProductRepository extends JpaRepository<Product, UUID> {

    List<Product> findAllByHouseId(UUID houseId);

    Optional<Product> findByIdAndHouseId(
        UUID productId,
        UUID houseId
    );

}
