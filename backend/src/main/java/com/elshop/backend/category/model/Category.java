package com.elshop.backend.category.model;

import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotBlank;

public record Category(
        @Id
        String id,
        @NotBlank
        String name
) {
}
