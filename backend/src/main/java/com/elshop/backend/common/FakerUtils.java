package com.elshop.backend.common;

import com.elshop.backend.product.model.Product;
import com.github.javafaker.Faker;

import java.util.Arrays;
import java.util.List;

public class FakerUtils {

    private static final Faker faker = new Faker();

    private static final AppUtils appUtils = new AppUtils();

    private FakerUtils() {
    }

    public static Product generateFakeProduct(int imagesNr) {
        List<String> images = generateImagesList(imagesNr);
        String id = appUtils.generateUuid();
        String title = faker.commerce().productName();
        String slug = appUtils.generateSlug(title);

        double price = Double.parseDouble(faker.commerce().price(1, 1000));
        return new Product(id, slug, title, price, images, "Mobile");
    }

    public static List<Product> generateFakeProductsList(int productsNr) {

        List<Product> list = Arrays.asList(new Product[productsNr]);

        return list.stream()
                .map(item -> generateFakeProduct(faker.number().numberBetween(1, 5)))
                .toList();
    }

    private static List<String> generateImagesList(int imagesNr) {
        List<String> list = Arrays.asList(new String[imagesNr]);
        return list.stream()
                .map(item -> faker.internet().image())
                .toList();
    }
}
