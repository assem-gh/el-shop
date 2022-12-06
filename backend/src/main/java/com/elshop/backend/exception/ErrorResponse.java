package com.elshop.backend.exception;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public record ErrorResponse(

        String timestamp,
        String type,
        String message,

        @JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "type")
        @JsonSubTypes({
                @JsonSubTypes.Type(value = ValidationErrorMessage.class, name = "validationMessages"),
                @JsonSubTypes.Type(value = ErrorMessage.class, name = "errorMessage")
        })
        Object data

) {

    public ErrorResponse(String type, String message, Object errors) {
        this(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss")),
                type, message, errors);

    }
}






