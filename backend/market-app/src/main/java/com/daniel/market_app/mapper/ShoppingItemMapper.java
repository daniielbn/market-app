package com.daniel.market_app.mapper;

import org.mapstruct.Mapper;
import java.util.Base64;

import com.daniel.market_app.domain.ShoppingItem;
import com.daniel.market_app.dto.response.ShoppingItemResponse;

@Mapper(componentModel = "spring")
public interface ShoppingItemMapper {

    ShoppingItemResponse toResponse(ShoppingItem shoppingItem);

    default String map(byte[] value) {
        if (value == null) return null;
        return Base64.getEncoder().encodeToString(value);
    }

}