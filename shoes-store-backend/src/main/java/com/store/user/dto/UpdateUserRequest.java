package com.store.user.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

@Builder
public record UpdateUserRequest(
        @NotBlank String firstName,
        @NotBlank String lastName) {
}
