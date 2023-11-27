package com.store.user.security.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.lang.NonNull;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Component
@Slf4j
public class AuthEntryPointJwt implements AuthenticationEntryPoint {
    @Override
    public void commence(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, AuthenticationException authException) throws IOException {
        log.error("Unauthorized error: {}",authException.getMessage());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        final Map<String,Object> body = new HashMap<>();
        body.put("status",HttpServletResponse.SC_UNAUTHORIZED);
        body.put("message",authException.getMessage());
        body.put("path",request.getRequestURI());
        new ObjectMapper().writeValue(response.getOutputStream(),body);

    }
}
