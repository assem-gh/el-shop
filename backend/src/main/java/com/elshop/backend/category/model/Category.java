package com.elshop.backend.category.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;

@Document(collection = "categories")
public record Category(
        @Id
        String id,
        @NotBlank
        String name
) {
}
