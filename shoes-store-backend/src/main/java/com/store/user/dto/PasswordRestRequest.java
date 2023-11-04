package com.store.user.dto;

import jakarta.validation.constraints.NotBlank;

public record PasswordRestRequest(@NotBlank String password) {
}
