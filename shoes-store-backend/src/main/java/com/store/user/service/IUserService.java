package com.store.user.service;

import com.store.user.dto.MessageResponse;
import com.store.user.dto.RegisterUserRequest;
import com.store.user.dto.UpdateUserRequest;
import com.store.user.dto.UserResponse;
import com.store.user.security.CustomerUserDetailsService;

import java.util.List;

public interface IUserService {
    long registerUser(RegisterUserRequest request);

    UserResponse getUserById(long id, CustomerUserDetailsService customerUserDetailsService);

    List<UserResponse> getListUsers();

    MessageResponse updateUser(long id, UpdateUserRequest request, CustomerUserDetailsService customerUserDetailsService);

    MessageResponse deleteUser(long id, CustomerUserDetailsService customerUserDetailsService);

}
