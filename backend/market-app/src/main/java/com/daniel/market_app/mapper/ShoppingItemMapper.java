package com.daniel.market_app.mapper;

import com.daniel.market_app.domain.Product;
import com.daniel.market_app.domain.ShoppingItem;
import com.daniel.market_app.dto.response.ProductResponse;
import com.daniel.market_app.dto.response.ShoppingItemResponse;
import org.mapstruct.Mapper;

import java.util.Base64;

@Mapper(componentModel = "spring")
public interface ShoppingItemMapper {

    ShoppingItemResponse toResponse(ShoppingItem shoppingItem);

    default ProductResponse toResponse(Product product) {
        String image = null;

        if (product.getImage() != null) {
            String contentType = product.getImageContentType() == null
                    ? "image/png"
                    : product.getImageContentType();

            image = "data:" + contentType + ";base64,"
                    + Base64.getEncoder().encodeToString(product.getImage());
        }

        return new ProductResponse(
                product.getId(),
                product.getName(),
                image
        );
    }

    default String map(byte[] value) {
        if (value == null) return null;
        return Base64.getEncoder().encodeToString(value);
    }

}