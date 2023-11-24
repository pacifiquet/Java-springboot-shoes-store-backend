package com.store.user.security.jwt;

import io.jsonwebtoken.Claims;
import org.springframework.security.core.userdetails.UserDetails;

import java.security.SignatureException;
import java.util.Map;
import java.util.function.Function;

public interface IJwtService {
    String generateToken(Map<String, Object> extraClaims, UserDetails userDetails);

    String generateToken(UserDetails userDetails);

    String generateRefreshToken(UserDetails userDetails);

    boolean isTokenValid(String token, UserDetails userDetails);

    boolean isTokenExpired(String token) throws SignatureException;

    String extractUsername(String token);

    <T> T extractClaim(String token, Function<Claims, T> claimsResolver);
}
