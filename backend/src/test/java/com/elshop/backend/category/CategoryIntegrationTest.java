package com.elshop.backend.category;

import com.elshop.backend.MvcTestUtils;
import com.elshop.backend.category.model.Category;
import com.elshop.backend.category.model.request.CategoryRequest;
import com.elshop.backend.common.FakerUtils;
import com.elshop.backend.exception.ErrorMessage;
import com.elshop.backend.exception.ErrorResponse;
import com.elshop.backend.exception.ResourceAlreadyExistException;
import com.fasterxml.jackson.core.type.TypeReference;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest
@AutoConfigureMockMvc
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
        Category category = mvcTestUtils.performMvcResourceOperation(
                requestData,
                HttpMethod.POST, categoriesEndpoint
                , HttpStatus.OK, new TypeReference<Category>() {
                }
        );
        assertFalse(category.id().isEmpty());
        assertEquals(requestData.name(), category.name());
    }

    @Test
    @DirtiesContext
    void addExistCategoryFail() throws Exception {
        CategoryRequest requstData = new CategoryRequest(FakerUtils.faker.commerce().department());

        // create category
        mvcTestUtils.performMvcResourceOperation(
                requstData, HttpMethod.POST, categoriesEndpoint, HttpStatus.OK, new TypeReference<Category>() {
                });

        // create category with the same name to test
        ErrorResponse response = mvcTestUtils
                .performMvcResourceOperation(requstData,
                        HttpMethod.POST,
                        categoriesEndpoint,
                        HttpStatus.CONFLICT,
                        new TypeReference<ErrorResponse>() {
                        });

        String expectedErrorMessage = String.format(
                "A Category with the name: %s already exists. Please choose a different name and try again.",
                requstData.name());
        ErrorMessage errorMessage = (ErrorMessage) response.data();
        assertEquals(ResourceAlreadyExistException.MESSAGE, response.message());
        assertEquals(ResourceAlreadyExistException.TYPE, response.type());
        assertEquals(expectedErrorMessage, errorMessage.error());
    }

    @Test
    @DirtiesContext
    void getAllCategoriesSuccess() throws Exception {
        List<Category> listAtBeginning = mvcTestUtils.performMvcResourceOperation(
                HttpMethod.GET, categoriesEndpoint, HttpStatus.OK, new TypeReference<List<Category>>() {
                });

        List<Category> expectedList = new ArrayList<Category>();
        assertTrue(listAtBeginning.isEmpty());

        List<CategoryRequest> requests = IntStream.range(0, 20)
                .mapToObj(category -> FakerUtils.generateCategoryRequest())
                .distinct()
                .toList();

        requests.forEach(request -> {
            try {
                Category response = mvcTestUtils.performMvcResourceOperation(
                        request, HttpMethod.POST, categoriesEndpoint, HttpStatus.OK, new TypeReference<Category>() {
                        });
                expectedList.add(response);
            } catch (Exception e) {
//
            }
        });

        List<Category> listAfter = mvcTestUtils.performMvcResourceOperation(
                HttpMethod.GET, categoriesEndpoint, HttpStatus.OK, new TypeReference<List<Category>>() {
                });
        assertEquals(expectedList, listAfter);
    }

}





