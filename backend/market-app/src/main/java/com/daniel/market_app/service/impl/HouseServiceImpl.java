package com.daniel.market_app.service.impl;

import org.springframework.stereotype.Service;

import com.daniel.market_app.domain.House;
import com.daniel.market_app.dto.request.CreateHouseRequest;
import com.daniel.market_app.dto.request.ValidateHouseRequest;
import com.daniel.market_app.dto.response.CreateHouseResponse;
import com.daniel.market_app.dto.response.ValidateHouseResponse;
import com.daniel.market_app.exception.HouseNotFoundException;
import com.daniel.market_app.mapper.HouseMapper;
import com.daniel.market_app.repository.HouseRepository;
import com.daniel.market_app.service.HouseService;
import com.daniel.market_app.utils.AccessCodeGenerator;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HouseServiceImpl implements HouseService {

    private final HouseRepository houseRepository;
    private final HouseMapper houseMapper;
    private final AccessCodeGenerator accessCodeGenerator;

   @Override
    public CreateHouseResponse createHouse(CreateHouseRequest request) {

        String accessCode;

        do {
            accessCode = accessCodeGenerator.generate();
        } while (houseRepository.existsByAccessCode(accessCode));

        House house = new House(
                request.name(),
                accessCode
        );

        House savedHouse = houseRepository.save(house);

        return houseMapper.toCreateResponse(savedHouse);
    }

   @Override
    public ValidateHouseResponse validateAccessCode(ValidateHouseRequest request) {

        House house = houseRepository
            .findByAccessCode(request.accessCode())
            .orElseThrow(() -> new HouseNotFoundException(request.accessCode()));   

        return houseMapper.toValidateResponse(house);
    }
}