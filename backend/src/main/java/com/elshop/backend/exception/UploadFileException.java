package com.elshop.backend.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;


@Getter
public class UploadFileException extends RuntimeException {
    public static final String TYPE = HttpStatus.SERVICE_UNAVAILABLE.getReasonPhrase();
    public static final String MESSAGE = "The server is currently unavailable, try again later!";
    private final String errorDetails;

    public UploadFileException(String details) {
        this.errorDetails = details;
    }
}
