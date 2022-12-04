package com.elshop.backend.common;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.security.SecureRandom;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Component
@Slf4j
public class KeyGenerateService {
    public String generateSlug(String title) {
        String random = generateUniqueString(8);
        return title
                .toLowerCase()
                .trim()
                .replace(' ', '-') + '-' + random;
    }

    public String generateUuid() {
        return UUID.randomUUID().toString();
    }

    private String generateUniqueString(int length) {
        String charPool = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        SecureRandom rnd = new SecureRandom();
        Set<Character> uniqueChars = new HashSet<>();
        StringBuilder sb = new StringBuilder();

        while (sb.length() < length) {
            char c = charPool.charAt(rnd.nextInt(charPool.length()));
            if (uniqueChars.add(c)) {
                sb.append(c);
            }
        }
        return sb.toString();
    }
}
