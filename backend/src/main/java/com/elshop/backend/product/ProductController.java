package com.elshop.backend.product;


import com.elshop.backend.common.KeyGenerateService;
import com.elshop.backend.common.S3Service;
import com.elshop.backend.product.model.Product;
import com.elshop.backend.product.model.request.ProductRequest;
import com.elshop.backend.product.model.response.ProductsListResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;


@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;
    private final S3Service s3Service;
    private final KeyGenerateService keyGenerateService;

    @GetMapping
    public ResponseEntity<ProductsListResponse> getAllProducts(@RequestParam(defaultValue = "0") int page,
                                                               @RequestParam(defaultValue = "10") int size) {
        return new ResponseEntity<>(productService.getAll(page, size), HttpStatus.OK);
    }


    @GetMapping("{id}")
    public ResponseEntity<Product> getProductById(@PathVariable String id) {
        return new ResponseEntity<>(productService.getById(id), HttpStatus.OK);
    }


    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Product> createNewProduct(@RequestParam(value = "images") MultipartFile[] imageFiles,
                                                    @RequestPart("data") @Valid ProductRequest newProductData) {

        String id = keyGenerateService.generateUuid();
        List<String> imagesUrl = s3Service.uploadMultipleFiles(imageFiles, "products", id);
        Product product = productService.createNewProduct(newProductData, id, imagesUrl);

        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void deleteProduct(@PathVariable String id) {
        productService.deleteProduct(id);
    }
}
