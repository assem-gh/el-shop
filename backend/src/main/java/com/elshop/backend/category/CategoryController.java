package com.elshop.backend.category;

import com.elshop.backend.category.model.Category;
import com.elshop.backend.category.model.request.CategoryRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping
    public Category addNewCategory(@Valid @RequestBody CategoryRequest requestData) {
        return categoryService.add(requestData);
    }


}