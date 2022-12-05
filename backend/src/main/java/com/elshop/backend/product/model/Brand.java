package com.elshop.backend.product.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "brands")
public record Brand(
        String id,
        String name
) {
}
