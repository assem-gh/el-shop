package com.elshop.backend;

import com.elshop.backend.category.model.Category;
import com.elshop.backend.category.model.request.CategoryRequest;
import com.elshop.backend.exception.ErrorResponse;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.List;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RequiredArgsConstructor
public class MvcTestUtils {
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final String categoriesEndpoint = "/api/categories/";


    private final MockMvc mvc;

    public Category performCategoryPostOperationExpectOk(CategoryRequest requestData) throws Exception {
        return performMvcResourceOperation(requestData,
                HttpMethod.POST,
                categoriesEndpoint,
                HttpStatus.OK,
                new TypeReference<Category>() {
                });
    }

    public ErrorResponse performCategoryPostOperationExpectError(CategoryRequest requestData, HttpStatus expectedStatus) throws Exception {
        return performMvcResourceOperation(requestData,
                HttpMethod.POST,
                categoriesEndpoint,
                expectedStatus,
                new TypeReference<ErrorResponse>() {
                });
    }

    public List<Category> performCategoryGetAllOperationExpectOk() throws Exception {
        return performMvcResourceOperation(null,
                HttpMethod.GET,
                categoriesEndpoint,
                HttpStatus.OK,
                new TypeReference<List<Category>>() {
                });
    }

    public <T> T performResourceGetOperation(HttpStatus expectedStatus, String uri, TypeReference<T> responseType) throws Exception {
        return performMvcResourceOperation(null,
                HttpMethod.GET,
                uri,
                expectedStatus,
                responseType);
    }

    public <T> T performCategoriesPutOperation(CategoryRequest requestData, HttpStatus expectedStatus, String uri, TypeReference<T> responseType) throws Exception {
        return performMvcResourceOperation(requestData, HttpMethod.PUT, uri, expectedStatus, responseType);
    }

    public <T, R> T performMvcResourceOperation(R requestData, HttpMethod method,
                                                String uri, HttpStatus expectedStatus,
                                                TypeReference<T> responseType)
            throws Exception {
        MockHttpServletRequestBuilder builder = MockMvcRequestBuilders.request(method, uri);

        if (method == HttpMethod.POST || method == HttpMethod.PUT) {
            builder.contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(requestData));
        }
        String res = mvc.perform(builder)
                .andExpect(status().is(expectedStatus.value()))
                .andReturn().getResponse().getContentAsString();
        return objectMapper.readValue(res, responseType);
    }

    public ObjectMapper mapper() {
        return this.objectMapper;
    }
}