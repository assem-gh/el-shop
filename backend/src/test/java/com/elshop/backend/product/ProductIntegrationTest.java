package com.elshop.backend.product;


import com.elshop.backend.MvcTestUtils;
import com.elshop.backend.category.model.Category;
import com.elshop.backend.category.model.request.CategoryRequest;
import com.elshop.backend.common.FakerUtils;
import com.elshop.backend.exception.ErrorResponse;
import com.elshop.backend.exception.UploadErrorMessage;
import com.elshop.backend.product.model.Product;
import com.elshop.backend.product.model.request.ProductRequest;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.mock.web.MockMultipartFile;
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
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final String productsEndpoint = "/api/products";
    private final String categoriesEndpoint = "/api/categories";


    private final MockMvc mockMvc;


    private final MvcTestUtils mvcTestUtils;

    @Autowired
    public ProductIntegrationTest(MockMvc mockMvc) {
        this.mockMvc = mockMvc;
        this.mvcTestUtils = new MvcTestUtils(mockMvc);
    }

    @Test
    @DirtiesContext
    void addNewValidProduct() throws Exception {
        ProductRequest requestProduct = FakerUtils.generateFakeProductRequest();
        String requestProductJson = objectMapper.writeValueAsString(requestProduct);

        MockMultipartFile image1 = new MockMultipartFile("images", "image1.jpg", "image/jpeg", "nice image".getBytes());
        MockMultipartFile image2 = new MockMultipartFile("images", "image2.jpg", "image/jpeg", "another one".getBytes());
        MockMultipartFile data = new MockMultipartFile("data", "", "application/json", requestProductJson.getBytes());

        String content = mockMvc.perform(MockMvcRequestBuilders.multipart(productsEndpoint)
                        .file(image1)
                        .file(image2)
                        .file(data)).andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        Product newProduct = objectMapper.readValue(content, Product.class);

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

        ProductRequest requestProduct = FakerUtils.generateFakeProductRequest();
        String requestProductJson = objectMapper.writeValueAsString(requestProduct);

        MockMultipartFile file1 = new MockMultipartFile("images", "file1.jpg", "text/plain", "nice file".getBytes());
        MockMultipartFile file2 = new MockMultipartFile("images", "file2.jpg", "text/plain", "another one".getBytes());
        MockMultipartFile data = new MockMultipartFile("data", "", "application/json", requestProductJson.getBytes());

        String response = mockMvc.perform(MockMvcRequestBuilders.multipart(productsEndpoint)
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

        ProductRequest requestProduct = FakerUtils.generateFakeProductRequest();
        String requestProductJson = objectMapper.writeValueAsString(requestProduct);

        MockMultipartFile data = new MockMultipartFile("data", "", "application/json", requestProductJson.getBytes());


        mockMvc.perform(MockMvcRequestBuilders.multipart(productsEndpoint)
                .file(data)).andExpect(status().isBadRequest());
    }


    @Test
    @DirtiesContext
    void addNotValidProductData() throws Exception {
        String requestProductJson = """
                {
                "price":33.33                       
                }
                """;

        MockMultipartFile image1 = new MockMultipartFile("images", "image1.jpg", "image/jpeg", "nice image".getBytes());
        MockMultipartFile image2 = new MockMultipartFile("images", "image2.jpg", "image/jpeg", "another one".getBytes());
        MockMultipartFile data = new MockMultipartFile("data", "", "application/json", requestProductJson.getBytes());

        String content = mockMvc.perform(MockMvcRequestBuilders.multipart(productsEndpoint)
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
                "images":[]         
                }
                """;

        MockMultipartFile image1 = new MockMultipartFile("images", "image1.jpg", "image/jpeg", "nice image".getBytes());
        MockMultipartFile image2 = new MockMultipartFile("images", "image2.jpg", "image/jpeg", "another one".getBytes());
        MockMultipartFile data = new MockMultipartFile("data", "", "application/json", requestProductJson.getBytes());


        String postResponse = mockMvc.perform(MockMvcRequestBuilders.multipart(productsEndpoint)
                        .file(image1)
                        .file(image2)
                        .file(data)).andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        Product createdProduct = objectMapper.readValue(postResponse, Product.class);

        String getResponse = mockMvc.perform(MockMvcRequestBuilders.get(productsEndpoint + "/" + createdProduct.id()))
                .andExpect(status().isOk())
                .andExpect(content().json(postResponse))
                .andReturn().getResponse().getContentAsString();

        assertEquals(postResponse, getResponse);
    }

    @Test
    @DirtiesContext
    void getNonExistProductWithId() throws Exception {
        String idToTest = "few65j453otlg";

        mockMvc.perform(MockMvcRequestBuilders.get(productsEndpoint + "/" + idToTest))
                .andExpect(status().isNotFound())
                .andExpect(content().json("""
                        {
                            "type":"Not Found",
                            "message":"We could not find the resource you requested.",
                            "data":{
                                "error":"Product with id: few65j453otlg, Does not exist!"
                            }
                        }
                                                 """));
    }

    @Test
    @DirtiesContext
    void getEmptyProductsList() throws Exception {
        int page = 0;
        int size = 5;


        mockMvc.perform(MockMvcRequestBuilders.get(String.format(productsEndpoint + "?page=%s&size=%s", page, size)))
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

        Category category = mvcTestUtils.performMvcResourceOperation(new CategoryRequest("Mobile"), HttpMethod.POST,
                categoriesEndpoint, HttpStatus.OK,
                new TypeReference<Category>() {
                });
        ProductRequest requestProduct = FakerUtils.generateFakeProductRequest(category);

        String requestProductJson = objectMapper.writeValueAsString(requestProduct);

        MockMultipartFile image1 = new MockMultipartFile("images", "image1.jpg", "image/jpeg", "nice image".getBytes());
        MockMultipartFile image2 = new MockMultipartFile("images", "image2.jpg", "image/jpeg", "another one".getBytes());
        MockMultipartFile data = new MockMultipartFile("data", "", "application/json", requestProductJson.getBytes());


        String createdProduct = mockMvc.perform(MockMvcRequestBuilders.multipart(productsEndpoint)
                        .file(image1)
                        .file(image2)
                        .file(data)).andExpect(status().isOk())
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();


        mockMvc.perform(MockMvcRequestBuilders.get(String.format("%s?page=%s&size=%s", productsEndpoint, page, size)))
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