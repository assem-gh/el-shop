package com.elshop.backend.category;

import com.elshop.backend.category.model.Category;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface CategoryRepository extends MongoRepository<Category, String> {

  Optional<Category> findCategoryByName(String name);

  boolean existsByName(String name);
}
