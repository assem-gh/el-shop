package com.elshop.backend.product;


import com.elshop.backend.exception.ErrorResponse;
import com.elshop.backend.product.model.Product;
import com.elshop.backend.product.model.request.ProductRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ProductIntegrationTest {

    @Autowired
    private MockMvc mvc;

    private final ObjectMapper objectMapper = new ObjectMapper();


    @Test
    @DirtiesContext
    void addNewValidProduct() throws Exception {
        ProductRequest requestProduct = new ProductRequest(
                "New 7aX 64GB",
                199.99,
                new ArrayList<>(),
                "Mobile"
        );

        String content = mvc.perform(MockMvcRequestBuilders.post("/api/products")
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(objectMapper.writeValueAsString(requestProduct)))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        Product newProduct = objectMapper.readValue(content, Product.class);

        assertFalse(newProduct.id().isEmpty());
        assertEquals(newProduct.slug()
                        .substring(0, newProduct.slug().length() - 9)
                        .replace('-', ' '),
                requestProduct.title().toLowerCase());
    }

    @Test
    @DirtiesContext
    void addNotValidProduct() throws Exception {
        String requestProduct = """
                {
                "price":33.33,
                "images":[],
                "category":"Mobile"
                }
                """;

        String content = mvc.perform(MockMvcRequestBuilders.post("/api/products")
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(requestProduct))
                .andExpect(status().isBadRequest())
                .andReturn().getResponse().getContentAsString();

        ErrorResponse response = objectMapper.readValue(content, ErrorResponse.class);
        List<?> errorMessages = (List<?>) response.data();

        assertEquals(HttpStatus.BAD_REQUEST.getReasonPhrase(), response.type());
        assertEquals("Invalid syntax for this request was provided", response.message());
        assertEquals(response.data().getClass(), ArrayList.class);
        assertEquals(1, errorMessages.size());
    }

    @Test
    @DirtiesContext
    void getExistProductWithId() throws Exception {
        String requestProduct = """
                {
                "title":"New 7aX 64GB",
                "price":199.99,
                "images":[],
                "category":"Mobile"
                }
                """;

        String postResponse = mvc.perform(MockMvcRequestBuilders.post("/api/products")
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(requestProduct))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        Product createdProduct = objectMapper.readValue(postResponse, Product.class);

        mvc.perform(MockMvcRequestBuilders.get("/api/products/" + createdProduct.id()))
                .andExpect(status().isOk())
                .andExpect(content().json(postResponse));
    }

    @Test
    @DirtiesContext
    void getEmptyProductsList() throws Exception {
        int page = 0;
        int size = 5;


        mvc.perform(MockMvcRequestBuilders.get(String.format("/api/products?page=%s&size=%s", page, size)))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                            "totalProducts": 0,
                            "totalPages": 0,
                            "currentPage": 0,
                            "hasNext": false,
                            "products": [
                                
                            ]
                        }
                                                        """));
    }

    @Test
    @DirtiesContext
    void getProductsList() throws Exception {
        int page = 0;
        int size = 5;
        ProductRequest requestProduct = new ProductRequest(
                "New 7aX 64GB",
                199.99,
                new ArrayList<>(),
                "Mobile"
        );


        String createdProduct = mvc.perform(MockMvcRequestBuilders.post("/api/products")
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(objectMapper.writeValueAsString(requestProduct)))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        mvc.perform(MockMvcRequestBuilders.get(String.format("/api/products?page=%s&size=%s", page, size)))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                            "totalProducts": 1,
                            "totalPages": 1,
                            "currentPage": 0,
                            "hasNext": false,
                            "products": [
                                <%>
                            ]
                        }
                                                        """.replace("<%>", createdProduct)));
    }
}
