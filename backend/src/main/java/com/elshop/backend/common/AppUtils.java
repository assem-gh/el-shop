package com.elshop.backend.common;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class AppUtils {

    public String generateSlug( String title) {
        String random = RandomStringUtils.random(8, true, true);
        return title
                .toLowerCase()
                .trim()
                .replace(' ', '-') + '-' + random;
    }

    public String generateUuid() {
        return UUID.randomUUID().toString();
    }
}
