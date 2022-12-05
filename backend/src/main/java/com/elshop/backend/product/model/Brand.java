package com.elshop.backend.product.model;

import org.springframework.data.annotation.Id;

public record Brand(
        @Id
        String id,
        String name

) {
}
