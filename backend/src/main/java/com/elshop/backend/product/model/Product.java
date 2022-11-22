package com.elshop.backend.product.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;


@Document(collection = "products")
public record Product(
        @Id String id,
        String slug,
        String title,
        Double price,
        List<String> images,
        String category

) {
}
