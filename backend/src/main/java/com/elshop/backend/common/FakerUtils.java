package com.elshop.backend.common;

import com.elshop.backend.category.model.Category;
import com.elshop.backend.product.model.Brand;
import com.elshop.backend.product.model.Product;
import com.elshop.backend.product.model.request.ProductRequest;
import com.github.javafaker.Faker;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.IntStream;

public class FakerUtils {
    public static final Faker faker = new Faker();
    private static final KeyGenerateService keyGenerateService = new KeyGenerateService();

    private FakerUtils() {
    }

    public static Product generateFakeProduct(int numberOfImages) {
        List<String> images = generateImagesList(numberOfImages);
        String id = keyGenerateService.generateUuid();
        String title = faker.commerce().productName();
        String slug = keyGenerateService.generateSlug(title);
        String description = faker.lorem().paragraph(5);
        BigDecimal price = new BigDecimal(faker.commerce().price(1, 1000));
        Brand brand = new Brand(faker.internet().uuid(), faker.company().name());
        Category category = new Category(faker.internet().uuid(),
                faker.commerce().department());
        return new Product(id, slug, title, price, images, category, brand, description);
    }

    public static Product generateFakeProduct(ProductRequest productRequest, int numberOfImages) {
        List<String> images = generateImagesList(numberOfImages);
        String id = keyGenerateService.generateUuid();
        String slug = keyGenerateService.generateSlug(productRequest.title());
        return new Product(
                id,
                slug,
                productRequest.title(),
                productRequest.price(),
                images,
                productRequest.category(),
                productRequest.brand(),
                productRequest.description()
        );
    }

    public static ProductRequest generateFakeProductRequest() {
        String title = faker.commerce().productName();
        Category category = new Category(faker.internet().uuid(),
                faker.commerce().department());
        Brand brand = new Brand(faker.internet().uuid(), faker.company().name());
        String description = faker.lorem().paragraph(5);
        BigDecimal price = new BigDecimal(faker.commerce().price(1, 1000));
        return new ProductRequest(title, price, category, brand, description);
    }

    public static List<Product> generateFakeProductsList(int numberOfProducts) {
        return IntStream.range(0, numberOfProducts)
                .mapToObj(x -> generateFakeProduct(
                        faker.number().numberBetween(1, 5)))
                .toList();
    }

    public static List<String> generateImagesList(int numberOfImages) {
        return IntStream.range(0, numberOfImages)
                .mapToObj(item -> faker.internet().image())
                .toList();
    }
}
