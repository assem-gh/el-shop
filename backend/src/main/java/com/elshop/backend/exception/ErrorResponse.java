package com.elshop.backend.exception;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;

public record ErrorResponse(
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm:ss")
        LocalDateTime timestamp,
        String type,
        String message,
        Object data

) {

        public ErrorResponse(String type,String message, Object errors){
                this(LocalDateTime.now(),type,message,errors);
        }
}






