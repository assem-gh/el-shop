package com.elshop.backend.category;

import com.elshop.backend.MvcTestUtils;
import com.elshop.backend.category.model.Category;
import com.elshop.backend.category.model.request.CategoryRequest;
import com.elshop.backend.common.FakerUtils;
import com.elshop.backend.exception.ErrorMessage;
import com.elshop.backend.exception.ErrorResponse;
import com.elshop.backend.exception.ResourceAlreadyExistException;
import com.elshop.backend.exception.ResourceNotFoundException;
import com.fasterxml.jackson.core.type.TypeReference;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
class CategoryIntegrationTest {
    private final String categoriesEndpoint = "/api/categories/";
    private final MvcTestUtils mvcTestUtils;

    @Autowired
    public CategoryIntegrationTest(MockMvc mockMvc) {
        this.mvcTestUtils = new MvcTestUtils(mockMvc);
    }

    @Test
    @DirtiesContext
    void addNewCategorySuccess() throws Exception {
        CategoryRequest requestData = new CategoryRequest(FakerUtils.faker.commerce().department());
        Category category = mvcTestUtils
                .performCategoryPostOperationExpectOk(requestData);
        assertFalse(category.id().isEmpty());
        assertEquals(requestData.name(), category.name());
    }

    @Test
    @DirtiesContext
    void addExistCategoryFail() throws Exception {
        CategoryRequest requestData = new CategoryRequest(FakerUtils.faker.commerce().department());

        // create category
        mvcTestUtils.performCategoryPostOperationExpectOk(requestData);
        // create category with the same name to test
        ErrorResponse response = mvcTestUtils
                .performCategoryPostOperationExpectError(requestData, HttpStatus.CONFLICT);

        String expectedErrorMessage = String.format(
                "A Category with the name: %s already exists. Please choose a different name and try again.",
                requestData.name());
        ErrorMessage errorMessage = mvcTestUtils.mapper()
                .convertValue(response.data(), ErrorMessage.class);

        assertEquals(ResourceAlreadyExistException.MESSAGE, response.message());
        assertEquals(ResourceAlreadyExistException.TYPE, response.type());
        assertEquals(expectedErrorMessage, errorMessage.error());
    }

    @Test
    @DirtiesContext
    void getAllCategoriesSuccess() throws Exception {
        List<Category> listAtBeginning = mvcTestUtils
                .performCategoryGetAllOperationExpectOk();

        List<Category> expectedList = new ArrayList<>();
        assertTrue(listAtBeginning.isEmpty());

        List<CategoryRequest> requests = IntStream.range(0, 20)
                .mapToObj(category -> FakerUtils.generateCategoryRequest())
                .distinct()
                .toList();

        requests.forEach(requestData -> {
            try {
                Category response = mvcTestUtils.performCategoryPostOperationExpectOk(requestData);
                expectedList.add(response);
            } catch (Exception e) {
//
            }
        });

        List<Category> listAfter = mvcTestUtils.performCategoryGetAllOperationExpectOk();
        assertEquals(expectedList, listAfter);
    }

    @Test
    @DirtiesContext
    void getCategoryByIdSuccess() throws Exception {
        CategoryRequest requestData = new CategoryRequest(FakerUtils.faker.commerce().department());
        Category createdCategory = mvcTestUtils.performCategoryPostOperationExpectOk(requestData);

        String uri = String.format("%s/%s", categoriesEndpoint, createdCategory.id());

        Category getRespone = mvcTestUtils
                .performResourceGetOperation(HttpStatus.OK, uri, new TypeReference<Category>() {
                });

        assertEquals(createdCategory, getRespone);
    }

    @Test
    @DirtiesContext
    void getCategoryByIdFail() throws Exception {
        String id = FakerUtils.faker.internet().uuid();
        String uri = String.format("%s/%s", categoriesEndpoint, id);

        ErrorResponse getRespone = mvcTestUtils
                .performResourceGetOperation(HttpStatus.NOT_FOUND, uri, new TypeReference<ErrorResponse>() {
                });
        String expectedMessage = String.format("%s with id: %s, Does not exist!", "Category", id);
        ErrorMessage errorMessage = mvcTestUtils.mapper()
                .convertValue(getRespone.data(), ErrorMessage.class);

        assertEquals(ResourceNotFoundException.MESSAGE, getRespone.message());
        assertEquals(ResourceNotFoundException.TYPE, getRespone.type());
        assertEquals(expectedMessage, errorMessage.error());
    }

    @Test
    @DirtiesContext
    void updateCategorySuccess() throws Exception {
        CategoryRequest requestData = new CategoryRequest(FakerUtils.faker.commerce().department());
        Category createdCategory = mvcTestUtils.performCategoryPostOperationExpectOk(requestData);

        String uri = String.format("%s/%s", categoriesEndpoint, createdCategory.id());

        CategoryRequest updateData = new CategoryRequest("New Category");

        Category updatedCategory = mvcTestUtils
                .performCategoriesPutOperation(updateData, HttpStatus.OK, uri,
                        new TypeReference<Category>() {
                        });
        assertEquals(updateData.name(), updatedCategory.name());
        assertEquals(createdCategory.id(), updatedCategory.id());

    }

    @Test

    @DirtiesContext
    void updateCategoryExistNameFail() throws Exception {
        String categoryName1 = "Mobile";
        String categoryName2 = "Notebook";
        CategoryRequest requestData1 = new CategoryRequest(categoryName1);
        CategoryRequest requestData2 = new CategoryRequest(categoryName2);
        mvcTestUtils.performCategoryPostOperationExpectOk(requestData1);
        Category createdCategory2 = mvcTestUtils.performCategoryPostOperationExpectOk(requestData2);

        String uri = String.format("%s/%s", categoriesEndpoint, createdCategory2.id());

        CategoryRequest updateDataCategory2 = new CategoryRequest(categoryName1);

        ErrorResponse updateResponse = mvcTestUtils
                .performCategoriesPutOperation(updateDataCategory2, HttpStatus.CONFLICT, uri, new TypeReference<ErrorResponse>() {
                });

        String expectedMessage = String
                .format("A Category with the name: %s already exists. Please choose a different name and try again.",
                        updateDataCategory2.name());
        ErrorMessage errorMessage = mvcTestUtils.mapper()
                .convertValue(updateResponse.data(), ErrorMessage.class);

        assertEquals(ResourceAlreadyExistException.MESSAGE, updateResponse.message());
        assertEquals(ResourceAlreadyExistException.TYPE, updateResponse.type());
        assertEquals(expectedMessage, errorMessage.error());

    }

    @Test
    @DirtiesContext
    void updateNotExitCategoryFail() throws Exception {

        String id = FakerUtils.faker.internet().uuid();
        String uri = String.format("%s/%s", categoriesEndpoint, id);

        CategoryRequest updateDataCategory2 = new CategoryRequest("New Category");

        ErrorResponse updateResponse = mvcTestUtils
                .performCategoriesPutOperation(updateDataCategory2, HttpStatus.NOT_FOUND, uri, new TypeReference<ErrorResponse>() {
                });

        String expectedMessage = String.format("%s with id: %s, Does not exist!", "Category", id);

        ErrorMessage errorMessage = mvcTestUtils.mapper()
                .convertValue(updateResponse.data(), ErrorMessage.class);

        assertEquals(ResourceNotFoundException.MESSAGE, updateResponse.message());
        assertEquals(ResourceNotFoundException.TYPE, updateResponse.type());
        assertEquals(expectedMessage, errorMessage.error());

    }

}





