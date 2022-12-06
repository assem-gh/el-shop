package com.elshop.backend.category;

import com.elshop.backend.category.model.Category;
import com.elshop.backend.category.model.request.CategoryRequest;
import com.elshop.backend.common.FakerUtils;
import com.elshop.backend.common.KeyGenerateService;
import com.elshop.backend.exception.ResourceAlreadyExistException;
import org.junit.jupiter.api.Test;

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
}
