package com.store.user.service;

import com.store.user.models.User;

import java.util.Map;

public interface IVerificationTokenService {
    void saveVerificationToken(String token, User user);

    Map<String, String> validateVerificationToken(String token);

    Map<String, String> requestNewToken(String oldToken);
}
