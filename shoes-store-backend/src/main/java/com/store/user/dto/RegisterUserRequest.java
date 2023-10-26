package com.store.user.dto;

import com.store.validation.ValidEmail;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import org.springframework.lang.NonNull;


@Builder
public record RegisterUserRequest(@ValidEmail String email,
                                  @NotBlank String firstName,
                                  @NotBlank String lastName,
                                  @NotBlank String password) {

}
