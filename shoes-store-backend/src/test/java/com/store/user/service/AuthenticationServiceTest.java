package com.store.user.service;

import com.store.user.dto.LoginRequest;
import com.store.user.dto.LoginResponse;
import com.store.user.models.Role;
import com.store.user.models.User;
import com.store.user.repository.IUserRepository;
import com.store.user.security.jwt.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@ActiveProfiles("test")
class AuthenticationServiceTest {
    @Mock
    private IUserRepository userRepository;
    @Mock
    private JwtService jwtService;
    @Mock
    AuthenticationManager authenticationManager;
    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AuthenticationService authenticationService;
    private User user;
    private LoginRequest loginRequest;

    @BeforeEach
    void setup(){
        user = User.builder()
                .id(1L)
                .email("user@gmail.com")
                .firstName("firstName")
                .lastName("lastName")
                .password(passwordEncoder.encode("pass1234"))
                .createdAt(LocalDateTime.now())
                .role(Role.USER)
                .build();
        loginRequest = LoginRequest.builder().email("user@gmail.com").password("pass1234").build();
    }

    @Test
    @DisplayName("Test Login user success")
    void testLoginSuccess() {
        // arrange
        Authentication authentication = mock(Authentication.class);
        when(authentication.isAuthenticated()).thenReturn(true);
        // Mock token generation
        when(jwtService.generateToken(any(UserDetails.class))).thenReturn("token");
        when(jwtService.generateRefreshToken(any(UserDetails.class))).thenReturn("refreshToken");

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class))).thenReturn(authentication);
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));
        // act
        LoginResponse response = authenticationService.login(loginRequest);
        // assert
        assertNotNull(response);
    }

    @Test
    @DisplayName("Test Login Failure")
    void testLoginFailure(){
        // arrange
        Authentication authentication = mock(Authentication.class);
        when(authentication.isAuthenticated()).thenReturn(false);
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class))).thenReturn(authentication);
        //act
        LoginResponse response = authenticationService.login(loginRequest);
        // assert
        assertNull(response);
    }
    @Test
    @DisplayName("Test user not found exception")
    void testLoginUserNotFound(){
        // arrange
        Authentication authentication = mock(Authentication.class);
        when(authentication.isAuthenticated()).thenReturn(true);
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class))).thenReturn(authentication);
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.empty());
        //assert
        assertThrows(UsernameNotFoundException.class,()-> authenticationService.login(loginRequest));
    }
}