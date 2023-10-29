package com.store.user.service;

import com.store.exceptions.UserException;
import com.store.user.dto.RegisterUserRequest;
import com.store.user.dto.UpdateUserRequest;
import com.store.user.dto.UserResponse;
import com.store.user.models.Role;
import com.store.user.models.User;
import com.store.user.repository.IUserRepository;
import com.store.user.security.CustomerUserDetailsService;
import jakarta.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@ActiveProfiles("test")
class UserServiceTest {

    @Mock
    private IUserRepository IUserRepository;
    @Mock
    PasswordEncoder passwordEncoder;
    @Mock
    ApplicationEventPublisher publisher;
    @InjectMocks
    private UserService userService;
    private RegisterUserRequest userRequest;
    private UpdateUserRequest updateUserRequest;
    private UserResponse userResponse;
    private User user;


    @BeforeEach
    void setUp() {
         userRequest = new RegisterUserRequest(
                 "user@gmail.com",
                 "pacifique",
                 "Twagirayesu",
                 "pass1233");
        updateUserRequest = new UpdateUserRequest(
                "user",
                "lastname");
        userResponse = new UserResponse(
                1L,
                "pacifique",
                "Twagirayesu",
                "user@gmail.com",
                passwordEncoder.encode("pass123"),
                Role.USER.name());
        user = User.builder()
                .id(1L)
                .email(userRequest.email())
                .lastName(userRequest.lastName())
                .firstName(userRequest.firstName())
                .password(passwordEncoder.encode(userRequest.password()))
                .createdAt(LocalDateTime.now())
                .role(Role.USER)
                .build();
    }

    @Test
    @DisplayName("Testing registering a user")
    void registerUser() {
        // arrange
        var expected_response = 1;
        doNothing().when(publisher).publishEvent(any(ApplicationEvent.class));
        HttpServletRequest servletRequest = mock(HttpServletRequest.class);
        when(IUserRepository.save(any(User.class))).thenReturn(user);
        // act
        var response = userService.registerUser(userRequest, servletRequest);
        // assert
        assertEquals(expected_response,response);
    }

    @Test
    void getListUsers() {
        // arrange
        var expected_response = List.of(userResponse);
        when(IUserRepository.findAll(any(Sort.class))).thenReturn(List.of(user));
        // act
        List<UserResponse> response = userService.getListUsers();
        // assert
        assertEquals(expected_response.size(),response.size());
    }

    @Test
    @DisplayName("Testing get user by id with invalid id")
    void testGetUserByIdWithInvalidId() {
        // arrange
        CustomerUserDetailsService customerUserDetailsService = mock(CustomerUserDetailsService.class);
        // assert
        assertThrows(UserException.class,()-> userService.getUserById(2, customerUserDetailsService));
    }

    @DisplayName("Test get user by id with valid id")
    @ParameterizedTest
    @ValueSource(longs = {1L})
    void testGetUserByIdWithValid(long userId){
        // arrange
        var expected_user = userResponse;
        CustomerUserDetailsService customerUserDetailsService = mock(CustomerUserDetailsService.class);
        when(IUserRepository.findById(any(Long.class))).thenReturn(Optional.of(user));
        when(customerUserDetailsService.getId()).thenReturn(1L);
        // act
        UserResponse response = userService.getUserById(userId, customerUserDetailsService);
        // assert
        assertEquals(expected_user.email(),response.email());
    }

    @Test
    @DisplayName("Testing updating user with logged user")
    void updateUserWithLoggedInUser() {
        // arrange
        var expected_response = "successfully updated";
        CustomerUserDetailsService customerUserDetailsService = mock(CustomerUserDetailsService.class);
        when(IUserRepository.findById(any(Long.class))).thenReturn(Optional.ofNullable(user));
        when(IUserRepository.save(any(User.class))).thenReturn(user);
        when(customerUserDetailsService.getId()).thenReturn(1L);
        // act
        var response = userService.updateUser(1L, updateUserRequest, customerUserDetailsService).message();
        // assert
        assertEquals(expected_response,response);
    }

    @Test
    @DisplayName("Testing updating invalid user")
    void updatingInvalidUser(){
        // arrange
        CustomerUserDetailsService customerUserDetailsService = mock(CustomerUserDetailsService.class);
        assertThrows(UserException.class,()-> userService.updateUser(2,updateUserRequest, customerUserDetailsService));
    }

    @Test
    @DisplayName("Test deleting user as logged in user")
    void testDeleteUserAsALoggedUser() {
        // arrange
        var expected_response = "successfully deleted";
        CustomerUserDetailsService customerUserDetailsService = mock(CustomerUserDetailsService.class);
        when(IUserRepository.findById(anyLong())).thenReturn(Optional.of(user));
        doNothing().when(IUserRepository).delete(any(User.class));
        when(customerUserDetailsService.getId()).thenReturn(3L);
        // act
        String response = userService.deleteUser(3L, customerUserDetailsService).message();
        //assert
        assertEquals(expected_response,response);

    }



    @Test
    @DisplayName("Test deleting invalid user")
    void  deleteInvalidUser(){
        // arrange
        CustomerUserDetailsService customerUserDetailsService = mock(CustomerUserDetailsService.class);
        assertThrows(UserException.class,()-> userService.deleteUser(2L, customerUserDetailsService));
    }
}