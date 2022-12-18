package com.elshop.backend.common;


import com.elshop.backend.config.KeycloackRoleConverter;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class KeycloackRoleConverterTest {

    private final KeycloackRoleConverter converter = new KeycloackRoleConverter();

    @Test
    void testConvert() {

        Jwt jwt = mock(Jwt.class);
        Map<String, Object> claims = new HashMap<>();
        claims.put("realm_access", Map.of("roles", List.of("ADMIN", "USER")));
        when(jwt.getClaims().get("realm_access")).thenReturn(claims);

        Collection<GrantedAuthority> authorities = converter.convert(jwt);
        assertEquals(2, Objects.requireNonNull(authorities).size());
        assertTrue(authorities.contains(new SimpleGrantedAuthority("ROLE_ADMIN")));
        assertTrue(authorities.contains(new SimpleGrantedAuthority("ROLE_USER")));
    }

    @Test
    void testConvertRealmAccessNull() {
        // Setup
        Jwt jwt = mock(Jwt.class);
        Map<String, Object> claims = new HashMap<>();
        when(jwt.getClaims()).thenReturn(claims);

        assertEquals(0, Objects.requireNonNull(converter.convert(jwt)).size());
    }

    @Test
    void testConvertRealmAccessEmpty() {
        // Setup
        Jwt jwt = mock(Jwt.class);
        Map<String, Object> claims = new HashMap<>();

        claims.put("realm_access", new HashMap<>());
        when(jwt.getClaims()).thenReturn(claims);

        assertEquals(0, Objects.requireNonNull(converter.convert(jwt)).size());
    }
}