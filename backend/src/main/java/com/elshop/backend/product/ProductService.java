package com.elshop.backend.product;

import com.elshop.backend.common.AppUtils;
import com.elshop.backend.exception.ResourceNotFoundException;
import com.elshop.backend.product.model.Product;
import com.elshop.backend.product.model.request.ProductRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@RequiredArgsConstructor
public class ProductService {

    private final AppUtils utils;
    private final ProductRepository productRepository;

    public Product getById(String id) {
        Optional<Product> productToFind = productRepository.findById(id);

        if (productToFind.isEmpty()) {
            throw new ResourceNotFoundException("Product", id);
        }
        return productToFind.get();
    }

    public Product createNewProduct(ProductRequest newProductData) {
        String id = utils.generateUuid();
        String slug = utils.generateSlug(newProductData.title());

        return productRepository.save(
                new Product(id, slug,
                        newProductData.title(),
                        newProductData.price(),
                        newProductData.images(),
                        newProductData.category()
                ));
    }
}
