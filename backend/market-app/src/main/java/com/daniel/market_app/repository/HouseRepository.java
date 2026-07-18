package com.daniel.market_app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.daniel.market_app.domain.House;

import java.util.Optional;
import java.util.UUID;

public interface HouseRepository extends JpaRepository<House, UUID> {

    Optional<House> findByAccessCode(String accessCode);

    boolean existsByAccessCode(String accessCode);

}