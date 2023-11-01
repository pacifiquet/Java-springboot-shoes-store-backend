package com.store.user.service;

import com.store.user.dto.PasswordRequest;
import com.store.user.security.CustomerUserDetailsService;

import java.util.Map;

public interface IPasswordResetTokenService {
    Map<String, String> resetPassword(String email);

    Map<String, String> savePassword(String token, PasswordRequest request);

    Map<String, String> changePassword(PasswordRequest request, CustomerUserDetailsService detailsService);
}
