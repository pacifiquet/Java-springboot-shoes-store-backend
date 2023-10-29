package com.store.user.security;


import com.store.user.models.Role;
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

import static com.store.user.utils.Constants.WHITE_LIST_PATH;
import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.POST;

@Component
@EnableWebSecurity
public record WebSecurityConfig(
        AuthenticationProvider authenticationProvider,
        JwtAuthenticationFilter jwtAuthenticationFilter,
        InternalApiAuthenticationFilter internalApiAuthenticationFilter
) {


    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(
                        auth -> auth.requestMatchers(WHITE_LIST_PATH).permitAll()
                                .requestMatchers(POST,"/api/v1/users").permitAll()
                                .requestMatchers(GET,"/api/v1/users").hasRole(Role.ADMIN.name())
                                .requestMatchers("/api/v1/users/**").hasAnyRole(Role.USER.name(),Role.ADMIN.name())
                                .anyRequest().authenticated()
                )
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(internalApiAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return httpSecurity.build();
    }


}
