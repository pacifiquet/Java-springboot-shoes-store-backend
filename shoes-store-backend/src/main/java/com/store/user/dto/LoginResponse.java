package com.store.user.dto;

import lombok.Builder;

import java.util.Map;

@Builder
public record LoginResponse(long id,String email, String firstName, String lastName, String role,
                            Map<String, String> tokens) {
}
