package com.elshop.backend;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Component
@RequiredArgsConstructor
@AutoConfigureMockMvc
public class MvcTestUtils {
    private final ObjectMapper objectMapper = new ObjectMapper();
    @Autowired
    private MockMvc mvc;


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

    public <T> T performMvcResourceOperation(HttpMethod method,
                                             String uri, HttpStatus expectedStatus,
                                             TypeReference<T> responseType) throws Exception {
        return performMvcResourceOperation(null, method, uri, expectedStatus, responseType);
    }
}
