package com.elshop.backend.product;


import com.elshop.backend.product.model.Product;
import com.elshop.backend.product.model.request.ProductRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin
public class ProductController {

    private final ProductService service;

    @GetMapping("{id}")
    public ResponseEntity<Product> getProductById(@PathVariable String id) {
        return new ResponseEntity<>(service.getById(id), HttpStatus.OK);
    }


    @PostMapping
    public ResponseEntity<Product> createNewProduct(@RequestBody @Valid ProductRequest newProductData) {
        return new ResponseEntity<>(service.createNewProduct(newProductData), HttpStatus.OK);
    }
}
