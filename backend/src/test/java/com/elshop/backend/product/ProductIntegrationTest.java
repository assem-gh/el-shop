package com.elshop.backend.product;


import com.elshop.backend.exception.ErrorResponse;
import com.elshop.backend.exception.UploadErrorMessage;
import com.elshop.backend.product.model.Product;
import com.elshop.backend.product.model.request.ProductRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ProductIntegrationTest {
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private MockMvc mvc;

    @Test
    @DirtiesContext
    void addNewValidProduct() throws Exception {
        ProductRequest requestProduct = new ProductRequest(
                "New 7aX 64GB",
                new BigDecimal("199.99"),
                "Mobile"
        );

        String requestProductJson = objectMapper.writeValueAsString(requestProduct);

        MockMultipartFile image1 = new MockMultipartFile("images", "image1.jpg", "image/jpeg", "nice image".getBytes());
        MockMultipartFile image2 = new MockMultipartFile("images", "image2.jpg", "image/jpeg", "another one".getBytes());
        MockMultipartFile data = new MockMultipartFile("data", "", "application/json", requestProductJson.getBytes());

        String content = mvc.perform(MockMvcRequestBuilders.multipart("/api/products")
                        .file(image1)
                        .file(image2)
                        .file(data)).andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();


        Product newProduct = objectMapper.readValue(content, Product.class);
        System.out.println(newProduct.images());
        assertFalse(newProduct.id().isEmpty());
        assertEquals(2, newProduct.images().size());
        assertEquals(newProduct.slug()
                        .substring(0, newProduct.slug().length() - 9)
                        .replace('-', ' '),
                requestProduct.title().toLowerCase());

    }

    @Test
    @DirtiesContext
    void addProductWithoutImages() throws Exception {

        ProductRequest requestProduct = new ProductRequest(
                "New 7aX 64GB",
                new BigDecimal("199.99"),
                "Mobile"
        );
        String requestProductJson = objectMapper.writeValueAsString(requestProduct);

        MockMultipartFile file1 = new MockMultipartFile("images", "file1.jpg", "text/plain", "nice file".getBytes());
        MockMultipartFile file2 = new MockMultipartFile("images", "file2.jpg", "text/plain", "another one".getBytes());
        MockMultipartFile data = new MockMultipartFile("data", "", "application/json", requestProductJson.getBytes());

        String response = mvc.perform(MockMvcRequestBuilders.multipart("/api/products")
                        .file(file1)
                        .file(file2)
                        .file(data))
                .andExpect(status().isUnsupportedMediaType())
                .andReturn().getResponse().getContentAsString();

        ErrorResponse errorResponse = objectMapper.readValue(response, ErrorResponse.class);

        assertEquals(UploadErrorMessage.INVALID_IMAGE_TYPE.getMessage(), errorResponse.message());
        assertEquals(HttpStatus.UNSUPPORTED_MEDIA_TYPE.getReasonPhrase(), errorResponse.type());

    }

    @Test
    @DirtiesContext
    void addProductWithNonImageFiles() throws Exception {

        ProductRequest requestProduct = new ProductRequest(
                "New 7aX 64GB",
                new BigDecimal("199.99"),
                "Mobile"
        );
        String requestProductJson = objectMapper.writeValueAsString(requestProduct);

        MockMultipartFile data = new MockMultipartFile("data", "", "application/json", requestProductJson.getBytes());


        mvc.perform(MockMvcRequestBuilders.multipart("/api/products")
                .file(data)).andExpect(status().isBadRequest());
    }

  
    @Test
    @DirtiesContext
    void addNotValidProductData() throws Exception {
        String requestProductJson = """
                {
                "price":33.33,
                 "category":"Mobile"
                }
                """;

        MockMultipartFile image1 = new MockMultipartFile("images", "image1.jpg", "image/jpeg", "nice image".getBytes());
        MockMultipartFile image2 = new MockMultipartFile("images", "image2.jpg", "image/jpeg", "another one".getBytes());
        MockMultipartFile data = new MockMultipartFile("data", "", "application/json", requestProductJson.getBytes());

        String content = mvc.perform(MockMvcRequestBuilders.multipart("/api/products")
                        .file(image1)
                        .file(image2)
                        .file(data)).andExpect(status().isBadRequest())
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
        String requestProductJson = """
                {
                "title":"New 7aX 64GB",
                "price":199.99,
                "images":[],
                "category":"Mobile"
                }
                """;

        MockMultipartFile image1 = new MockMultipartFile("images", "image1.jpg", "image/jpeg", "nice image".getBytes());
        MockMultipartFile image2 = new MockMultipartFile("images", "image2.jpg", "image/jpeg", "another one".getBytes());
        MockMultipartFile data = new MockMultipartFile("data", "", "application/json", requestProductJson.getBytes());


        String postResponse = mvc.perform(MockMvcRequestBuilders.multipart("/api/products")
                        .file(image1)
                        .file(image2)
                        .file(data)).andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        Product createdProduct = objectMapper.readValue(postResponse, Product.class);

        String getResponse = mvc.perform(MockMvcRequestBuilders.get("/api/products/" + createdProduct.id()))
                .andExpect(status().isOk())
                .andExpect(content().json(postResponse))
                .andReturn().getResponse().getContentAsString();

        assertEquals(postResponse, getResponse);
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
                new BigDecimal("199.99"),
                "Mobile"
        );

        String requestProductJson = objectMapper.writeValueAsString(requestProduct);


        MockMultipartFile image1 = new MockMultipartFile("images", "image1.jpg", "image/jpeg", "nice image".getBytes());
        MockMultipartFile image2 = new MockMultipartFile("images", "image2.jpg", "image/jpeg", "another one".getBytes());
        MockMultipartFile data = new MockMultipartFile("data", "", "application/json", requestProductJson.getBytes());


        String createdProduct = mvc.perform(MockMvcRequestBuilders.multipart("/api/products")
                        .file(image1)
                        .file(image2)
                        .file(data)).andExpect(status().isOk())
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
