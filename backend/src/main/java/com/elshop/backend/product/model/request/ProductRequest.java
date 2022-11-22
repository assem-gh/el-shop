package com.elshop.backend.product.model.request;



import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

public record ProductRequest(
        @NotBlank(message = "Title is required!")  String title,
        @NotNull(message = "Price is required!") Double price,
        List<String> images,
        String category
) {
}
