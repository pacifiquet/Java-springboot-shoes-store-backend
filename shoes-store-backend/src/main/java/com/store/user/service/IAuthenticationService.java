package com.store.user.service;

import com.store.user.dto.LoginRequest;
import com.store.user.dto.LoginResponse;
import com.store.user.dto.MessageResponse;

public interface IAuthenticationService {
    LoginResponse login(LoginRequest request);

    MessageResponse makeAdmin(String email);
    LoginResponse refreshToken(String token);

}
