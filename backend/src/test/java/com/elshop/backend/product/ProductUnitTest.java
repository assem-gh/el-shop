package com.elshop.backend.product;


import com.elshop.backend.common.AppUtils;
import com.elshop.backend.exception.ResourceNotFoundException;
import com.elshop.backend.product.model.Product;
import com.elshop.backend.product.model.request.ProductRequest;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


class ProductUnitTest {

    private final ProductRepository mockRepository = mock(ProductRepository.class);
    private final AppUtils utils = new AppUtils();
    private final AppUtils mockUtils = mock(AppUtils.class);
    private final ProductService productService = new ProductService(mockUtils, mockRepository);


    @Test
    void generateSlugTest() {
        String title = "New 7aX 64GB";
        String slug = utils.generateSlug(title);

        assertTrue(slug.matches("(?i)^[a-z0-9-]+$"));
    }

    @Test
    void addNewProduct() {

        ProductRequest newProductData = new ProductRequest("New 7aX 64GB", 99.99, new ArrayList<>(), "Mobile");
        Product productToTest = new Product(
                "7146680b-0127-4d9a-a4fe-853e591e28ca",
                "new-7aX-64gb-3bU3RSXW",
                newProductData.title(),
                newProductData.price(),
                newProductData.images(),
                newProductData.category()
        );

        when(mockUtils.generateUuid())
                .thenReturn(productToTest.id());
        when(mockUtils.generateSlug(newProductData.title()))
                .thenReturn("new-7aX-64gb-3bU3RSXW");

        productService.createNewProduct(newProductData);

        verify(mockRepository).save(productToTest);
    }

    @Test
    void getExistProductById() {
        Product productToTest = new Product(
                "7146680b-0127-4d9a-a4fe-853e591e28ca",
                "new-7aX-64gb-3bU3RSXW",
                "New 7aX 64GB",
                199.99,
                new ArrayList<>(),
                "Mobile"
        );

        when(mockRepository.findById(productToTest.id())).thenReturn(Optional.of(productToTest));
        Product actual = productService.getById(productToTest.id());
        assertEquals(productToTest, actual);
    }

    @Test
    void getNonExistProductById() {
        String idToTest = "gfdt6agtkeweh5";
        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class, () -> productService.getById(idToTest));

        assertEquals("Product with id: gfdt6agtkeweh5, Does not exist!", exception.getErrorDetails());

    }
}
