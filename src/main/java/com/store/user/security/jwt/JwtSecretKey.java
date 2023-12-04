package com.store.user.security.jwt;

import com.store.config.StoreConfigProperties;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.crypto.SecretKey;

@Configuration
@AllArgsConstructor
public class JwtSecretKey {
    private final StoreConfigProperties configProperties;

    @Bean
    public SecretKey secretKey() {
        byte[] decode = Decoders.BASE64.decode(configProperties.getJwtSecurityKey().getJwt().getSecretKey());
        return Keys.hmacShaKeyFor(decode);
    }
}
