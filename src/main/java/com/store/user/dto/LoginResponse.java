package com.store.user.dto;

import lombok.Builder;

import java.util.Map;

@Builder
public record LoginResponse(long id, String email, String firstName, String lastName, String role,
                            String profile,
                            String address,
                            Map<String, String> tokens) {
}
