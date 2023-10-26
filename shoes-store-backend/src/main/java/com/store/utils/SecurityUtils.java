package com.store.utils;

import com.store.user.models.Role;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.util.StringUtils;

public class SecurityUtils {
    private static final String ROLE_PREFIX = "ROLE_";
    private static final String AUTH_TOKEN_TYPE = "Bearer";
    private static final String AUTH_TOKEN_PREFIX = AUTH_TOKEN_TYPE + " ";

    private SecurityUtils() {
    }

    public static SimpleGrantedAuthority convertToAuthority(Role role) {
        String authority = role.name().startsWith(ROLE_PREFIX) ? role.name() : ROLE_PREFIX + role.name();
        return new SimpleGrantedAuthority(authority);
    }

    public static String extractTokenFromHeader(HttpServletRequest request) {
        String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        return StringUtils.hasLength(header) && header.startsWith(AUTH_TOKEN_PREFIX) ? header.substring(7) : null;
    }
}
