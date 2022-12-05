package com.elshop.backend.exception;

public enum UploadFileMessage {

    NO_IMAGES_PROVIDED("No images were provided in the request."),
    INVALID_IMAGE_TYPE("The provided files are not valid images."),
    UPLOAD_ERROR("An error occurred while uploading the files. Please try again later."),
    FILE_READ_ERROR("An error occurred while reading the files.");


    private final String message;

    UploadFileMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

}





