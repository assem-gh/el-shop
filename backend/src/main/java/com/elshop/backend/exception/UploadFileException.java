package com.elshop.backend.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;


@Getter
public class UploadFileException extends RuntimeException {
    private final String errorType;
    private final String errorMessage;

    private final HttpStatus errorCode;
    private final String errorDetails;

    public UploadFileException(HttpStatus errorCode, UploadErrorMessage message, String details) {
        this.errorType = errorCode.getReasonPhrase();
        this.errorCode = errorCode;
        this.errorMessage = message.getMessage();
        this.errorDetails = details;

    }
}
