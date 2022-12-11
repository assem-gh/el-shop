package com.elshop.backend.product.model.request;


import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

public record ProductRequest(
        @NotBlank(message = "Title is required!")
        String title,
        @NotNull(message = "Price is required!")
        BigDecimal price,
        String category,
        @NotBlank(message = "Description must not be blank")
        String description
) {
}
