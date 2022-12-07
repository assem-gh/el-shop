package com.elshop.backend.category;

import com.elshop.backend.category.model.Category;
import com.elshop.backend.category.model.request.CategoryRequest;
import com.elshop.backend.common.FakerUtils;
import com.elshop.backend.common.KeyGenerateService;
import com.elshop.backend.exception.ResourceAlreadyExistException;
import com.elshop.backend.exception.ResourceNotFoundException;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class CategoryUnitTest {

    private final CategoryRepository mockRepository = mock(CategoryRepository.class);
    private final KeyGenerateService mockKeyGenerateService = mock(KeyGenerateService.class);
    private final CategoryService categoryService = new CategoryService(mockKeyGenerateService, mockRepository);


    @Test
    void addNewCategorySuccess() {
        CategoryRequest requestData = new CategoryRequest("Mobile");
        String id = FakerUtils.faker.internet().uuid();
        when(mockRepository.findCategoryByName(requestData.name()))
                .thenReturn(Optional.empty());
        when(mockKeyGenerateService.generateUuid())
                .thenReturn(id);

        categoryService.add(requestData);
        verify(mockRepository).save(new Category(id, requestData.name()));
    }

    @Test
    void addExistCategoryFail() {
        CategoryRequest requestData = new CategoryRequest("Mobile");
        String id = FakerUtils.faker.internet().uuid();
        Category existCategory = new Category(id, requestData.name());

        when(mockRepository.findCategoryByName(requestData.name()))
                .thenReturn(Optional.of(existCategory));

        ResourceAlreadyExistException exception = assertThrows(ResourceAlreadyExistException.class, () -> categoryService.add(requestData));
        String expectedMessage = String.format("A Category with the name: %s already exists. Please choose a different name and try again.", requestData.name());
        assertEquals(expectedMessage, exception.getErrorDetails());
    }

    @Test
    void getAllCategoriesSuccess() {
        List<Category> categorisList = FakerUtils.generateListOfCategories(20);
        when(mockRepository.findAll())
                .thenReturn(categorisList);

        List<Category> actualList = categoryService.getAll();
        assertEquals(20, actualList.size());
        assertEquals(categorisList, actualList);
    }

    @Test
    void getCategoryByIdSuccess() {
        Category existCategory = FakerUtils.generateCategory();
        when(mockRepository.findById(existCategory.id()))
                .thenReturn(Optional.of(existCategory));
        Category actualCategory = categoryService.getById(existCategory.id());
        assertEquals(existCategory, actualCategory);
    }

    @Test
    void getCategoryByIdFail() {
        String randomId = FakerUtils.faker.internet().uuid();
        when(mockRepository.findById(randomId))
                .thenReturn(Optional.empty());
        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class, () -> categoryService.getById(randomId));
        String expectMessage = String.format("Category with id: %s, Does not exist!", randomId);
        assertEquals(expectMessage, exception.getErrorDetails());
    }


    @Test
    void updateCategorySuccess() {
        CategoryRequest requestData = FakerUtils.generateCategoryRequest();
        String id = FakerUtils.faker.internet().uuid();
        when(mockRepository.existsByName(requestData.name())).thenReturn(false);
        when(mockRepository.existsById(id)).thenReturn(true);

        categoryService.updateCategory(id, requestData);
        verify(mockRepository).save(new Category(id, requestData.name()));
    }

    @Test
    void updateNotExistCategoryFail() {
        CategoryRequest requestData = FakerUtils.generateCategoryRequest();
        String id = FakerUtils.faker.internet().uuid();
        when(mockRepository.existsByName(requestData.name())).thenReturn(false);
        when(mockRepository.existsById(id)).thenReturn(false);
        ResourceNotFoundException exception = assertThrows(
                ResourceNotFoundException.class,
                () -> categoryService.updateCategory(id, requestData));
        String expectedMessage = String.format("Category with id: %s, Does not exist!", id);
        assertEquals(expectedMessage, exception.getErrorDetails());
    }

    @Test
    void updateCategoryWithExistNameFail() {
        CategoryRequest requestData = FakerUtils.generateCategoryRequest();
        String id = FakerUtils.faker.internet().uuid();
        when(mockRepository.existsByName(requestData.name())).thenReturn(true);

        ResourceAlreadyExistException exception = assertThrows(
                ResourceAlreadyExistException.class,
                () -> categoryService.updateCategory(id, requestData));
        String expectedMessage = String.format("A Category with the name: %s already exists. Please choose a different name and try again.", requestData.name());
        assertEquals(expectedMessage, exception.getErrorDetails());
    }

    @Test
    void deleteCategorySuccess() {
        String id = FakerUtils.faker.internet().uuid();
        when(mockRepository.existsById(id)).thenReturn(true);

        categoryService.deleteById(id);
        verify(mockRepository).deleteById(id);
    }

    @Test
    void deleteNotExistCategoryFail() {
        String id = FakerUtils.faker.internet().uuid();
        when(mockRepository.existsById(id)).thenReturn(false);
        ResourceNotFoundException exception = assertThrows(
                ResourceNotFoundException.class,
                () -> categoryService.deleteById(id));
        String expectedMessage = String.format("Category with id: %s, Does not exist!", id);
        assertEquals(expectedMessage, exception.getErrorDetails());
    }
}
