package com.daniel.market_app.service;

import com.daniel.market_app.dto.request.CreateHouseRequest;
import com.daniel.market_app.dto.request.ValidateHouseRequest;
import com.daniel.market_app.dto.response.CreateHouseResponse;
import com.daniel.market_app.dto.response.ValidateHouseResponse;

public interface HouseService {

    CreateHouseResponse createHouse(CreateHouseRequest request);

    ValidateHouseResponse validateAccessCode(ValidateHouseRequest request);

}
