package com.store.user.security;


import com.store.user.security.jwt.AuthEntryPointJwt;
import com.store.user.security.jwt.InternalApiAuthenticationFilter;
import com.store.user.security.jwt.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;

import static com.store.user.models.Role.ADMIN;
import static com.store.user.models.Role.USER;
import static com.store.utils.Constants.WHITE_LIST_PATH;
import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.POST;

@Component
@EnableWebSecurity
public record WebSecurityConfig(
        AuthenticationProvider authenticationProvider,
        JwtAuthenticationFilter jwtAuthenticationFilter,
        InternalApiAuthenticationFilter internalApiAuthenticationFilter,
        AuthEntryPointJwt authEntryPointJwt
) {


    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(
                        auth -> auth.requestMatchers(WHITE_LIST_PATH).permitAll()
                                .requestMatchers(POST, "/api/v1/users").permitAll()
                                .requestMatchers(GET,"/api/v1/products/**").permitAll()
                                .requestMatchers(GET, "/api/v1/users").hasRole(ADMIN.name())
                                .requestMatchers("/api/v1/users/**").hasAnyRole(USER.name(), ADMIN.name())
                                .requestMatchers(POST,"/api/v1/reviews/**").hasAnyRole(USER.name(),ADMIN.name())
                                .requestMatchers(GET,"/api/v1/reviews/**").permitAll()
                                .anyRequest().authenticated())
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(internalApiAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return httpSecurity.build();
    }

}
