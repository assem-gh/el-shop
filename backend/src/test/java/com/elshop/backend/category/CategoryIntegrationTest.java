package com.elshop.backend.category;

import com.elshop.backend.MvcTestUtils;
import com.elshop.backend.category.model.Category;
import com.elshop.backend.category.model.request.CategoryRequest;
import com.elshop.backend.common.FakerUtils;
import com.elshop.backend.exception.ErrorMessage;
import com.elshop.backend.exception.ErrorResponse;
import com.elshop.backend.exception.ResourceAlreadyExistException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.test.annotation.DirtiesContext;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;


@SpringBootTest
@AutoConfigureMockMvc
class CategoryIntegrationTest {
    private final String categoriesEndpoint = "/api/categories/";
    @Autowired
    MvcTestUtils mvcTestUtils;


    @Test
    @DirtiesContext
    void addNewCategorySuccess() throws Exception {
        CategoryRequest requstData = new CategoryRequest(FakerUtils.faker.commerce().department());
        Category category = mvcTestUtils.performMvcResourceOperation(
                requstData,
                HttpMethod.POST, categoriesEndpoint
                , HttpStatus.OK,
                Category.class);
        assertFalse(category.id().isEmpty());
        assertEquals(requstData.name(), category.name());
    }

    @Test
    @DirtiesContext
    void addExistCategoryFail() throws Exception {
        CategoryRequest requstData = new CategoryRequest(FakerUtils.faker.commerce().department());

        // create category
        mvcTestUtils.performMvcResourceOperation(
                requstData, HttpMethod.POST, categoriesEndpoint, HttpStatus.OK, Category.class);

        // create category with the same name to test
        ErrorResponse response = mvcTestUtils
                .performMvcResourceOperation(requstData, HttpMethod.POST, categoriesEndpoint, HttpStatus.CONFLICT, ErrorResponse.class);
        String expectedErrorMessage = String.format(
                "A Category with the name: %s already exists. Please choose a different name and try again.",
                requstData.name());
        ErrorMessage errorMessage = (ErrorMessage) response.data();
        assertEquals(ResourceAlreadyExistException.MESSAGE, response.message());
        assertEquals(ResourceAlreadyExistException.TYPE, response.type());
        assertEquals(expectedErrorMessage, errorMessage.error());
    }

}





