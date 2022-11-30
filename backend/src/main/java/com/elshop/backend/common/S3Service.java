package com.elshop.backend.common;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ListObjectsRequest;
import com.amazonaws.services.s3.model.ObjectListing;
import com.amazonaws.services.s3.model.S3ObjectSummary;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

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
                .toList();
    }

    public String uploadFile(MultipartFile file, String type, String entityId) {
        String originalFilename = file.getOriginalFilename();
        String bucketKey;
        try {
            File imageFile = convertMultiPartToFile(file);
            bucketKey = String.format("%s/%s/%s", type, entityId, originalFilename);
            s3.putObject(bucketName, bucketKey, imageFile);
            Files.delete(imageFile.toPath());
            return s3.getUrl(bucketName, bucketKey).toString();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }

    public void deleteFileByName(final String keyName) {
        DeleteObjectRequest deleteObjectRequest = new DeleteObjectRequest(bucketName, keyName);
        s3.deleteObject(deleteObjectRequest);
    }

    public void deleteAll(final String prefix, String bucketName) {
        ListObjectsRequest listObjectsRequest = new ListObjectsRequest()
                .withBucketName(bucketName)
                .withPrefix(prefix);
        ObjectListing objectListing = s3.listObjects(listObjectsRequest);

        while (true) {
            for (S3ObjectSummary objectSummary : objectListing.getObjectSummaries()) {
                s3.deleteObject(bucketName, objectSummary.getKey());
            }
            if (objectListing.isTruncated()) {
                objectListing = s3.listNextBatchOfObjects(objectListing);
            } else {
                break;
            }
        }
    }

    private File convertMultiPartToFile(MultipartFile multipartFile) throws IOException {
        File file = new File(Objects.requireNonNull(multipartFile.getOriginalFilename()));
        try (FileOutputStream fos = new FileOutputStream(file)) {
            fos.write(multipartFile.getBytes());
        }
        return file;
    }
}