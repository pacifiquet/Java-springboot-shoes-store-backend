package com.store.user.dto;

import lombok.Builder;

@Builder
public record UserResponse(
        long id,
        String firstName,
        String lastName,
        String email,
        String role,
        String createdAt) {
}
