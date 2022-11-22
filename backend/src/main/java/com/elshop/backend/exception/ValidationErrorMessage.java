package com.elshop.backend.exception;

public record ValidationErrorMessage(String field, String error) {
}
