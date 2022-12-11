package com.elshop.backend.product.model;

import com.elshop.backend.category.model.Category;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import java.math.BigDecimal;
import java.util.List;


@Document(collection = "products")
public record Product(
        @Id String id,
        String slug,
        @NotNull
        String title,
        BigDecimal price,
        List<String> images,
        @DBRef
        Category category,
        @Null
        Brand brand,
        String description
) {
}
