package com.elshop.backend.category;

import com.elshop.backend.category.model.Category;
import com.elshop.backend.category.model.request.CategoryRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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

    @PutMapping("{id}")
    public Category updateById(@PathVariable String id, @RequestBody @Valid CategoryRequest requestData) {
        return categoryService.updateCategory(id, requestData);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void updateById(@PathVariable String id) {
        categoryService.deleteById(id);
    }
}