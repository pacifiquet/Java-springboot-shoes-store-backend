package com.store.user.service;

import com.store.user.dto.RegisterUserRequest;
import com.store.user.dto.UserResponse;
import com.store.user.security.CustomerUserDetailsService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface IUserService {
    Map<String, String> registerUser(RegisterUserRequest request, HttpServletRequest servletRequest);

    UserResponse getUserById(long id, CustomerUserDetailsService customerUserDetailsService);

    List<UserResponse> getListUsers();

    UserResponse updateUser(long id, CustomerUserDetailsService customerUserDetailsService, MultipartFile profile, Map<String, String> otherUserInfo);

    Map<String, String> deleteUser(long id, CustomerUserDetailsService customerUserDetailsService);

    UserResponse userProfile(CustomerUserDetailsService userDetailsService);
}
