package com.elshop.backend.category;

import com.elshop.backend.category.model.Category;
import com.elshop.backend.category.model.request.CategoryRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping
    public Category addNewCategory(@Valid @RequestBody CategoryRequest requestData) {
        return categoryService.add(requestData);
    }

    @GetMapping
    public List<Category> addNewCategory() {
        return categoryService.getAll();
    }

    @GetMapping("{id}")
    public Category addNewCategory(@PathVariable String id) {
        return categoryService.getById(id);
    }


}