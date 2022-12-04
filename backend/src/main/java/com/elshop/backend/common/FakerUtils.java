package com.elshop.backend.common;

import com.elshop.backend.product.model.Product;
import com.github.javafaker.Faker;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.IntStream;

public class FakerUtils {

    private static final Faker faker = new Faker();

    private static final KeyGenerateService RANDOM_IDS_SERVICE = new KeyGenerateService();

    private FakerUtils() {
    }

    public static Product generateFakeProduct(int numberOfImages) {
        List<String> images = generateImagesList(numberOfImages);
        String id = RANDOM_IDS_SERVICE.generateUuid();
        String title = faker.commerce().productName();
        String slug = RANDOM_IDS_SERVICE.generateSlug(title);

        BigDecimal price = new BigDecimal(faker.commerce().price(1, 1000));
        return new Product(id, slug, title, price, images, "Mobile");
    }

    public static List<Product> generateFakeProductsList(int numberOfProducts) {
        return IntStream.range(0, numberOfProducts)
                .mapToObj(x -> generateFakeProduct(faker.number().numberBetween(1, 5)))
                .toList();
    }

    private static List<String> generateImagesList(int numberOfImages) {
        return IntStream.range(0, numberOfImages)
                .mapToObj(item -> faker.internet().image())
                .toList();
    }
}
