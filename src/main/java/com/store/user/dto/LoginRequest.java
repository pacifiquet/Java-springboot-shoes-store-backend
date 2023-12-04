package com.store.user.dto;

import com.store.user.validation.ValidEmail;
import jakarta.validation.constraints.NotBlank;


public record LoginRequest(@ValidEmail String email, @NotBlank String password) {
}
