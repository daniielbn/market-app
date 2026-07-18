package com.daniel.market_app.mapper;

import org.mapstruct.Mapper;

import com.daniel.market_app.domain.ShoppingItem;
import com.daniel.market_app.dto.response.ShoppingItemResponse;

@Mapper(componentModel = "spring")
public interface ShoppingItemMapper {

    ShoppingItemResponse toResponse(ShoppingItem shoppingItem);

}