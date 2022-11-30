package com.elshop.backend.product;

import com.elshop.backend.common.AppUtils;
import com.elshop.backend.exception.ResourceNotFoundException;
import com.elshop.backend.product.model.Product;
import com.elshop.backend.product.model.request.ProductRequest;
import com.elshop.backend.product.model.response.ProductsListResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
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

    public Product createNewProduct(ProductRequest newProductData, String id, List<String> images) {
        String slug = utils.generateSlug(newProductData.title());

        return productRepository.save(new Product(id, slug,
                newProductData.title(), newProductData.price(),
                images, newProductData.category()));
    }

    public ProductsListResponse getAll(int page, int size) {
        Page<Product> pageProduct = productRepository.findAll(PageRequest.of(page, size));

        return new ProductsListResponse(
                pageProduct.getTotalElements(),
                pageProduct.getTotalPages(),
                pageProduct.getNumber(),
                pageProduct.hasNext(),
                pageProduct.getContent()
        );
    }


    public void deleteProduct(String id) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isEmpty()) {
            throw new ResourceNotFoundException("Product", id);
        }
        productRepository.delete(optionalProduct.get());
    }
}
