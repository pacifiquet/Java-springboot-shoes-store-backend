package com.store.user.dto;

public record UserResponse(
        long id,
        String firstName,
        String lastName,
        String email,
        String role,
        String profile,
        String createdAt) {
}
