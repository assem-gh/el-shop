package com.elshop.backend.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ResourceNotFoundException extends RuntimeException {
    public static final String TYPE = HttpStatus.NOT_FOUND.getReasonPhrase();
    public static final String MESSAGE = "We could not find the resource you requested.";
    private final String errorDetails;

    public ResourceNotFoundException(String resourceName, String id) {
        super();
        this.errorDetails = String.format("%s with id: %s, Does not exist!", resourceName, id);

    }
}
