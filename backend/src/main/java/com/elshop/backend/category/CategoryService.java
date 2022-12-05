package com.elshop.backend.category;

import com.elshop.backend.category.model.Category;
import com.elshop.backend.category.model.request.CategoryRequest;
import com.elshop.backend.common.KeyGenerateService;
import com.elshop.backend.exception.ResourceAlreadyExistException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryService {


    private final KeyGenerateService keyGenerateService;
    private final CategoryRepository categoryRepository;


    public Category add(CategoryRequest requestData) {
        Optional<Category> existCategory = categoryRepository.findCategoryByName(requestData.name());
        if (existCategory.isPresent()) {
            throw new ResourceAlreadyExistException("Category", requestData.name());
        }
        String id = keyGenerateService.generateUuid();
        return categoryRepository.save(new Category(id, requestData.name()));
    }
}
