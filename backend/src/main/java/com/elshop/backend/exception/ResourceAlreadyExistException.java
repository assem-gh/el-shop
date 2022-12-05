package com.elshop.backend.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ResourceAlreadyExistException extends RuntimeException {
    public static final String TYPE = HttpStatus.CONFLICT.getReasonPhrase();
    public static final String MESSAGE = "A resource with the provided name already exists.";
    private final String errorDetails;

    public ResourceAlreadyExistException(String resourceName, String name) {
        this.errorDetails = String.format("A %s with the name %s already exists. Please choose a different name and try again.", resourceName, name);
    }
}
