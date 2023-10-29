package com.store.user.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.store.exceptions.UserException;
import com.store.user.dto.MessageResponse;
import com.store.user.dto.RegisterUserRequest;
import com.store.user.dto.UpdateUserRequest;
import com.store.user.dto.UserResponse;
import com.store.user.security.CustomerUserDetailsService;
import com.store.user.service.IUserService;
import jakarta.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDateTime;
import java.util.List;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
@ActiveProfiles("test")
class UserControllerTest {
    private MockMvc mockMvc;
    @Mock
    private IUserService userService;
    @InjectMocks
    private UserController userController;
    private UserResponse userResponse;
    private JacksonTester<RegisterUserRequest> requestJacksonTester;
    private JacksonTester<UpdateUserRequest> updateUserRequestJacksonTester;
    private RegisterUserRequest registerUserRequest;
    private MessageResponse messageResponse;
    private UpdateUserRequest updateUserRequest;

    @BeforeEach
    void setUp(){
        JacksonTester.initFields(this,new ObjectMapper());
        this.mockMvc = MockMvcBuilders.standaloneSetup(userController)
                .setControllerAdvice(new UserException("user not found"))
                .build();

        registerUserRequest = new RegisterUserRequest(
                "user@gmail.com",
                "user",
                "lastname",
                "pass123");
        userResponse = new UserResponse(
                1L,
                "user",
                "lastname",
                "user@gmail.com",
                "USER",
                LocalDateTime.now().toString()
        );
        updateUserRequest = new UpdateUserRequest(
                "firstName",
                "lastName"
        );

        messageResponse = new MessageResponse(
                "successfully request");
    }

    @Test
    @DisplayName("Testing registering user endpoint")
    void testRegisterUser() throws Exception {
        // arrange
        when(userService.registerUser(any(RegisterUserRequest.class), any(HttpServletRequest.class))).thenReturn(1L);
        // act
        ResultActions resultActions = this.mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/users")
                .contentType(MediaType.APPLICATION_JSON).content(requestJacksonTester.write(registerUserRequest).getJson()));
        // assert
        resultActions.andExpect(status().isCreated());

    }
    @Test
    @DisplayName("Testing get user list")
    void testGetUserList() throws Exception {
        // arrange
        var expected_response = userResponse;
        when(userService.getListUsers()).thenReturn(List.of(userResponse));
        // act && assert
        ResultActions resultActions = this.mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/users").contentType(MediaType.APPLICATION_JSON));
        // assert
        resultActions.andExpect(status().isOk())
                .andExpect(jsonPath("$.size()", is(List.of(expected_response).size())));
    }

    @Test
    @DisplayName("Testing get user by Id")
    void testingGetUserById() throws Exception{
        var expected_response = userResponse;
        when(userService.getUserById(anyLong(), any(CustomerUserDetailsService.class))).thenReturn(userResponse);
        ResultActions response = this.mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/users/{id}", 1L)
                .contentType(MediaType.APPLICATION_JSON));

        response.andExpect(status().isOk());
        response.andExpect(jsonPath("$.id",equalTo(1)));
        response.andExpect(jsonPath("$.email",is(expected_response.email())));
        response.andExpect(jsonPath("$.role",is(expected_response.role())));
    }

    @Test
    @DisplayName("test updating user account")
    void  testUpdatingUser() throws Exception {
        var expected_response = messageResponse;
        when(userService.updateUser(anyLong(),any(UpdateUserRequest.class), any(CustomerUserDetailsService.class))).thenReturn(messageResponse);
        ResultActions response = this.mockMvc.perform(MockMvcRequestBuilders.put("/api/v1/users/{id}", 1L)
                .contentType(MediaType.APPLICATION_JSON)
                .content(updateUserRequestJacksonTester.write(updateUserRequest).getJson())
        );
        response.andExpect(status().isOk());
        response.andExpect(jsonPath("$.message",is(expected_response.message())));
    }


    @Test
    @DisplayName("test deleting user account")
    void  testDeletingUser() throws Exception {
        var expected_response = messageResponse;
        when(userService.deleteUser(anyLong(), any(CustomerUserDetailsService.class))).thenReturn(messageResponse);
        ResultActions response = this.mockMvc.perform(MockMvcRequestBuilders.delete("/api/v1/users/{id}", 1L)
                .contentType(MediaType.APPLICATION_JSON));
        response.andExpect(status().isOk());
        response.andExpect(jsonPath("$.message",is(expected_response.message())));
    }
}
