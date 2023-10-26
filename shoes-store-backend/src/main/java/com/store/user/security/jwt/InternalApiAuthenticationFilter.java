package com.store.user.security.jwt;

import com.store.config.StoreConfigProperties;
import com.store.user.security.CustomerUserDetailsService;
import com.store.utils.SecurityUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Slf4j
public class InternalApiAuthenticationFilter extends OncePerRequestFilter {
    private final StoreConfigProperties appProperties;

    @Override
    protected boolean shouldNotFilter(@NonNull HttpServletRequest request) throws ServletException {
        return !request.getRequestURI().startsWith("/api/v1/auth/internal");
    }

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {

        try {
            String requestKey = SecurityUtils.extractTokenFromHeader(request);
            if (requestKey == null || !Objects.equals(requestKey, appProperties.getAuthenticationKey().getInternalApiKey())) {
                log.warn("Internal key point requested with wrong key uri: {}", request.getRequestURI());
            }
            UserDetails superUser = CustomerUserDetailsService.createSuperUser();
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(superUser, null, superUser.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);

        } catch (Exception ex) {
            log.error("Could not set user authentication in security context", ex);
        }

        filterChain.doFilter(request, response);
    }
}
