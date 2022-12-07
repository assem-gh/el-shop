package com.elshop.backend.exception;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public record ErrorResponse(
        String timestamp,
        String type,
        String message,
        Object data

) {
    public ErrorResponse(String type, String message, Object errors) {
        this(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss")),
                type, message, errors);
    }
}






