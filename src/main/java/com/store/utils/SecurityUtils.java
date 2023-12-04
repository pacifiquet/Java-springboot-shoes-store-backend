package com.store.utils;

import com.store.user.models.Role;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.util.StringUtils;

public class SecurityUtils {

    private SecurityUtils() {
    }

    public static SimpleGrantedAuthority convertToAuthority(Role role) {
        String authority = role.name().startsWith(Constants.ROLE_PREFIX) ? role.name() : Constants.ROLE_PREFIX + role.name();
        return new SimpleGrantedAuthority(authority);
    }

    public static String extractTokenFromHeader(HttpServletRequest request) {
        String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        return StringUtils.hasLength(header) && header.startsWith(Constants.AUTH_TOKEN_PREFIX) ? header.substring(7) : null;
    }
}
