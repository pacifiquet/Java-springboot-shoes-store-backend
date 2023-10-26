package com.store.config;

import lombok.AllArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@EnableWebMvc
@Component
@AllArgsConstructor
public class CorsConfig implements WebMvcConfigurer {
    private final StoreConfigProperties configProperties;

    @Override
    public void addCorsMappings(@NonNull CorsRegistry registry) {
        registry.addMapping("/api/v1/**")
                .allowedOrigins(configProperties.getFrontEndUrl(), configProperties.getFrontEndUrlNginx())
                .allowedMethods("*")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
