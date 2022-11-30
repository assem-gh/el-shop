package com.elshop.backend.common;

import com.elshop.backend.product.model.Product;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

class FakerUtilsTest {
    @Test
    void generateProductTest() {
        Product actual = FakerUtils.generateFakeProduct(4);
        assertEquals(actual.getClass(), Product.class);
        assertEquals(4, actual.images().size());
    }

    @Test
    void generateListOfProductsTest() {
        List<Product> actual = FakerUtils.generateFakeProductsList(25);
        assertEquals(25, actual.size());
    }
}
