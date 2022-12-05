package com.elshop.backend.exception;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.support.MissingServletRequestPartException;

import java.util.List;

@RestControllerAdvice
public class AppControllerAdvisor {


    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleException(MethodArgumentNotValidException ex) {

        List<FieldError> fieldErrors = ex.getBindingResult().getFieldErrors();
        List<ValidationErrorMessage> errors = fieldErrors.stream()
                .map(err -> new ValidationErrorMessage(err.getField(), err.getDefaultMessage()))
                .toList();

        return new ErrorResponse(HttpStatus.BAD_REQUEST.getReasonPhrase(),
                "Invalid syntax for this request was provided", errors);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleException(ResourceNotFoundException ex) {
        return new ErrorResponse(ResourceNotFoundException.TYPE,
                ResourceNotFoundException.MESSAGE,
                new ErrorMessage(ex.getErrorDetails()));
    }

    @ExceptionHandler(MissingServletRequestPartException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleException(MissingServletRequestPartException ex) {
        return new ErrorResponse(HttpStatus.BAD_REQUEST.getReasonPhrase(),
                UploadErrorMessage.NO_IMAGES_PROVIDED.getMessage(), new ErrorMessage(ex.getMessage()));
    }

    @ExceptionHandler(UploadFileException.class)
    public ResponseEntity<ErrorResponse> handleException(UploadFileException ex) {
        return new ResponseEntity<>(new ErrorResponse(ex.getErrorType(),
                ex.getErrorMessage(), new ErrorMessage(ex.getErrorDetails())), ex.getErrorCode());
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponse handleException(Exception e) {
        return new ErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase(),
                "Unexpected internal server error", e.getMessage());
    }

}
