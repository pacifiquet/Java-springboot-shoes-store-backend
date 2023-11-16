package com.store.user.service;

import com.store.user.dto.LoginRequest;
import com.store.user.dto.LoginResponse;
import com.store.user.dto.MessageResponse;
import com.store.user.dto.UserResponse;
import com.store.user.security.CustomerUserDetailsService;

public interface IAuthenticationService {
    LoginResponse login(LoginRequest request);

    MessageResponse makeAdmin(String email);

}
