package com.elshop.backend.product;


import com.elshop.backend.common.AppUtils;
import com.elshop.backend.common.FakerUtils;
import com.elshop.backend.exception.ResourceNotFoundException;
import com.elshop.backend.product.model.Product;
import com.elshop.backend.product.model.request.ProductRequest;
import com.elshop.backend.product.model.response.ProductsListResponse;
import org.junit.jupiter.api.Test;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;
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
    void getAllProduct() {
        List<Product> products = FakerUtils.generateFakeProductsList(20);

        long totalItems = products.size();
        int itemPerPage = 5;
        int pageToReturn = 0;
        int totalPages = (int) Math.ceil(totalItems / itemPerPage);

        ProductsListResponse expectedResponse = new ProductsListResponse(totalItems, totalPages, 0, true,
                products);

        Page page = mock(Page.class);
        when(page.getTotalElements()).thenReturn(totalItems);
        when(page.getTotalPages()).thenReturn(totalPages);
        when(page.getNumber()).thenReturn(pageToReturn);
        when(page.hasNext()).thenReturn(true);
        when(page.getContent()).thenReturn(products);

        when(mockRepository.findAll(PageRequest.of(pageToReturn, itemPerPage))).thenReturn(page);
        ProductsListResponse actual = productService.getAll(pageToReturn, itemPerPage);
        assertEquals(expectedResponse, actual);

    }

    @Test
    void addNewProduct() {
        List<String> images = List.of("http/url1.abc", "http/url2.abc", "http/url3.abc");

        ProductRequest newProductData = new ProductRequest("New 7aX 64GB", 99.99, "Mobile");
        Product productToTest = new Product(
                "7146680b-0127-4d9a-a4fe-853e591e28ca",
                "new-7aX-64gb-3bU3RSXW",
                newProductData.title(),
                newProductData.price(),
                images,
                newProductData.category()
        );

        when(mockUtils.generateSlug(newProductData.title()))
                .thenReturn("new-7aX-64gb-3bU3RSXW");


        productService.createNewProduct(newProductData, "7146680b-0127-4d9a-a4fe-853e591e28ca", images);

        verify(mockRepository).save(productToTest);

    }


    @Test
    void getExistProductById() {
        Product productToTest = FakerUtils.generateFakeProduct(4);
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

    @Test
    void deleteNonExistProductById() {
        String idToTest = "gfdt6agtkeweh5";
        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class, () -> productService.deleteProduct(idToTest));

        assertEquals("Product with id: gfdt6agtkeweh5, Does not exist!", exception.getErrorDetails());

    }

    @Test
    void deleteExistProductById() {
        Product productToTest = FakerUtils.generateFakeProduct(4);
        when(mockRepository.findById(productToTest.id())).thenReturn(Optional.of(productToTest));

        productService.deleteProduct(productToTest.id());
        verify(mockRepository).delete(productToTest);

    }
}
