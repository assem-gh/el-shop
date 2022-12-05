package com.elshop.backend.category.model.request;

import javax.validation.constraints.NotBlank;

public record CategoryRequest(
        @NotBlank
        String name
) {
}
