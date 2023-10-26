package com.store.user.dto;

import jakarta.validation.constraints.NotBlank;


public record UpdateUserRequest(@NotBlank String firstName,
         @NotBlank String lastName) {
}
