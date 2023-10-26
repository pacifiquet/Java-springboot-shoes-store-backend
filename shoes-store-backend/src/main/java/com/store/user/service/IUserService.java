package com.store.user.service;

import com.store.user.dto.MessageResponse;
import com.store.user.dto.RegisterUserRequest;
import com.store.user.dto.UpdateUserRequest;
import com.store.user.dto.UserResponse;
import com.store.user.security.UserDetailsService;

import java.util.List;

public interface IUserService {
    long registerUser(RegisterUserRequest request);

    UserResponse getUserById(long id, UserDetailsService userDetailsService);

    List<UserResponse> getListUsers();

    MessageResponse updateUser(long id, UpdateUserRequest request, UserDetailsService userDetailsService);

    MessageResponse deleteUser(long id, UserDetailsService userDetailsService);

}
