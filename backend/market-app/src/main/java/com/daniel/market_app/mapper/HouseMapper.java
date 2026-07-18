package com.daniel.market_app.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.daniel.market_app.domain.House;
import com.daniel.market_app.dto.response.CreateHouseResponse;
import com.daniel.market_app.dto.response.HouseResponse;
import com.daniel.market_app.dto.response.ValidateHouseResponse;

@Mapper(componentModel = "spring")
public interface HouseMapper {

    CreateHouseResponse toCreateResponse(House house);

    HouseResponse toResponse(House house);

    @Mapping(target = "houseId", source = "id")
    @Mapping(target = "houseName", source = "name")
    ValidateHouseResponse toValidateResponse(House house);

}