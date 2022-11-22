package com.elshop.backend.product;


import com.elshop.backend.product.model.Product;
import com.elshop.backend.product.model.request.ProductRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;


@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService service;

    @PostMapping
    public Product createNewProduct(@RequestBody @Valid ProductRequest newProductData) {
        return service.createNewProduct(newProductData);
    }
}
