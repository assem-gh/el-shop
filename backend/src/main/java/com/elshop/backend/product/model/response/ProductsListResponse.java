package com.elshop.backend.product.model.response;

import com.elshop.backend.product.model.Product;

import java.util.List;

public record ProductsListResponse(long totalProducts, int totalPages, int currentPage, boolean hasNext,
                                   List<Product> products) {
}
