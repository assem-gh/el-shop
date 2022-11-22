package com.elshop.backend.product;

import com.elshop.backend.common.AppUtils;
import com.elshop.backend.product.model.Product;
import com.elshop.backend.product.model.request.ProductRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final AppUtils utils;
    private final ProductRepository productRepository;


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
