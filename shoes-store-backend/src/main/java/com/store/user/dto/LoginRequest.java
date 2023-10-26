package com.store.user.dto;

import com.store.validation.ValidEmail;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;


@Builder
public record LoginRequest(@ValidEmail String email, @NotBlank String password) {
}
