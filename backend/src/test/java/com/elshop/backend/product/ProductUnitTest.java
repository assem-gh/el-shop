package com.elshop.backend.product;


import com.elshop.backend.category.CategoryRepository;
import com.elshop.backend.common.FakerUtils;
import com.elshop.backend.common.KeyGenerateService;
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
    private final ProductRepository mockedProductRepository = mock(ProductRepository.class);
    private final CategoryRepository mockedCategoryRepository = mock(CategoryRepository.class);
    private final KeyGenerateService utils = new KeyGenerateService();
    private final KeyGenerateService mockUtils = mock(KeyGenerateService.class);
    private final ProductService productService = new ProductService(mockUtils, mockedProductRepository, mockedCategoryRepository);

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
        when(mockedProductRepository.findAll(PageRequest.of(pageToReturn, itemPerPage))).thenReturn(page);
        ProductsListResponse actual = productService.getAll(pageToReturn, itemPerPage);
        assertEquals(expectedResponse, actual);
    }

    @Test
    void addNewProduct() {
        ProductRequest newProductData = FakerUtils.generateFakeProductRequest();
        Product productToTest = FakerUtils.generateFakeProduct(newProductData, 5);

        when(mockUtils.generateSlug(newProductData.title()))
                .thenReturn(productToTest.slug());

        productService.createNewProduct(newProductData, productToTest.id(), productToTest.images());
        verify(mockedProductRepository).save(productToTest);

    }

    @Test
    void getExistProductById() {
        Product productToTest = FakerUtils.generateFakeProduct(4);
        when(mockedProductRepository.findById(productToTest.id())).thenReturn(Optional.of(productToTest));
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
        when(mockedProductRepository.findById(productToTest.id())).thenReturn(Optional.of(productToTest));
        productService.deleteProduct(productToTest.id());
        verify(mockedProductRepository).delete(productToTest);
    }
}
