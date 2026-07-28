package com.daniel.market_app.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.web.multipart.MultipartFile;

public record CreateProductRequest(

        @NotBlank
        @Size(max = 255)
        String name,

        @NotNull
        MultipartFile image

) {
}