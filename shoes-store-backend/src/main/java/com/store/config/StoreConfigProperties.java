package com.store.config;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "application")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class StoreConfigProperties {
    private String frontEndUrl;
    private String frontEndUrlNginx;
    private AuthenticationKey authenticationKey;
    private JwtSecurityKey jwtSecurityKey;

    @Data
    public static class AuthenticationKey {
        private String internalApiKey;
    }

    @Data
    public static class JwtSecurityKey {
        private Jwt jwt;

        @Data
        public static class Jwt {
            private String secretKey;
            private long expiration;
            private RefreshToken refreshToken;

            @Data
            public static class RefreshToken {
                private long expiration;
            }
        }
    }
}
