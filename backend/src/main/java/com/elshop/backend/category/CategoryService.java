package com.elshop.backend.category;

import com.elshop.backend.category.model.Category;
import com.elshop.backend.category.model.request.CategoryRequest;
import com.elshop.backend.common.KeyGenerateService;
import com.elshop.backend.exception.ResourceAlreadyExistException;
import com.elshop.backend.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private static final String RESOURCE_NAME = "Category";

    private final KeyGenerateService keyGenerateService;
    private final CategoryRepository categoryRepository;


    public Category add(CategoryRequest requestData) {
        Optional<Category> existCategory = categoryRepository.findCategoryByName(requestData.name());
        if (existCategory.isPresent()) {
            throw new ResourceAlreadyExistException(RESOURCE_NAME, requestData.name());
        }
        String id = keyGenerateService.generateUuid();
        return categoryRepository.save(new Category(id, requestData.name()));
    }

    public List<Category> getAll() {
        return categoryRepository.findAll();
    }

    public Category getById(String id) {
        return categoryRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(RESOURCE_NAME, id));
    }

    public Category updateCategory(String id, CategoryRequest requestData) {
        if (categoryRepository.existsByName(requestData.name())) {
            throw new ResourceAlreadyExistException(RESOURCE_NAME, requestData.name());
        }
        if (!categoryRepository.existsById(id)) {
            throw new ResourceNotFoundException(RESOURCE_NAME, id);
        }
        Category updatedCategory = new Category(id, requestData.name());
        return categoryRepository.save(updatedCategory);
    }

    public void deleteById(String id) {
        if (!categoryRepository.existsById(id)) {
            throw new ResourceNotFoundException(RESOURCE_NAME, id);
        }
        categoryRepository.deleteById(id);
    }

}
