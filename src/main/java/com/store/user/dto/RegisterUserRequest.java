package com.store.user.dto;

import com.store.user.validation.ValidEmail;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;


@Builder
public record RegisterUserRequest(@ValidEmail String email,
                                  @NotBlank String firstName,
                                  @NotBlank String lastName,
                                  @NotBlank String address,
                                  @NotBlank String password) {

}
