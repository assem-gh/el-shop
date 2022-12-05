package com.elshop.backend.product.model.request;


import com.elshop.backend.category.model.Category;
import com.elshop.backend.product.model.Brand;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

public record ProductRequest(
        @NotBlank(message = "Title is required!")
        String title,
        @NotNull(message = "Price is required!")
        BigDecimal price,
        Category category,
        Brand brand,
        String description
) {
}
