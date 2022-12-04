package com.elshop.backend.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.io.IOException;


@Getter
public class UploadFileException extends IOException {
    public static final String TYPE = HttpStatus.SERVICE_UNAVAILABLE.getReasonPhrase();
    public static final String MESSAGE = "The server is currently unavailable, try again later!";
    private final String errorDetails;

    public UploadFileException(String details) {
        this.errorDetails = details;
    }
}
