package com.store.config;

import lombok.AllArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import static com.store.user.utils.Constants.CORS_ALLOWED_HEADER;
import static com.store.user.utils.Constants.CORS_ALLOWED_METHOD;
import static com.store.user.utils.Constants.CORS_MAPPING;

@EnableWebMvc
@Component
@AllArgsConstructor
public class CorsConfig implements WebMvcConfigurer {
    private final StoreConfigProperties configProperties;
    @Override
    public void addCorsMappings(@NonNull CorsRegistry registry) {
        registry.addMapping(CORS_MAPPING)
                .allowedOrigins(configProperties.getFrontEndUrl(), configProperties.getFrontEndUrlNginx())
                .allowedMethods(CORS_ALLOWED_METHOD)
                .allowedHeaders(CORS_ALLOWED_HEADER)
                .allowCredentials(true);
    }
}
