package com.elshop.backend.common;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.transfer.TransferManager;
import com.amazonaws.services.s3.transfer.TransferManagerBuilder;
import com.amazonaws.services.s3.transfer.Upload;
import com.elshop.backend.exception.UploadFileException;
import com.elshop.backend.exception.UploadFileMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class S3Service {
    private final AmazonS3 s3;

    private final String bucketName;

    public S3Service(@Value("${cloud.aws.bucket}") String bucketName, AmazonS3 s3) {
        this.s3 = s3;
        this.bucketName = bucketName;
    }

    public List<String> uploadMultipleFiles(MultipartFile[] images, String type, String entityId) {
        return Arrays.stream(images)
                .map(image -> uploadFile(image, type, entityId))
                .collect(Collectors.toList());

    }


    public String uploadFile(MultipartFile file, String type, String entityId) {

        if (!file.getContentType().startsWith("image/")) {
            throw new UploadFileException(HttpStatus.UNSUPPORTED_MEDIA_TYPE,
                    UploadFileMessage.INVALID_IMAGE_TYPE, null);
        }
        Path bucketKey;
        try (InputStream inputStream = file.getInputStream()) {
            bucketKey = Paths.get(type, entityId, UUID.randomUUID().toString());
            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentType(file.getContentType());
            objectMetadata.setContentLength(file.getSize());
            TransferManager transferManager = TransferManagerBuilder.defaultTransferManager();
            PutObjectRequest request = new PutObjectRequest(bucketName, bucketKey.toString(), inputStream, objectMetadata);
            Upload upload = transferManager.upload(request);
            upload.waitForCompletion();
            return s3.getUrl(bucketName, bucketKey.toString()).toString();
        } catch (Exception e) {
            String errorMessage = String.format(
                    "Error uploading file '%s' with size %d and content type '%s':%n%s",
                    file.getOriginalFilename(),
                    file.getSize(),
                    file.getContentType(),
                    e.getMessage() != null ? e.getMessage() : "Unknown error"
            );
            throw new UploadFileException(HttpStatus.SERVICE_UNAVAILABLE, UploadFileMessage.UPLOAD_ERROR, errorMessage);
        }
    }

}