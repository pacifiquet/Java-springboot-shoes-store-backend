package com.store.user.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.store.config.CustomerUserDetailsServiceArgumentResolver;
import com.store.exceptions.UserException;
import com.store.user.dto.RegisterUserRequest;
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
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.mock.web.MockPart;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.store.utils.Constants.FIRST_NAME;
import static com.store.utils.Constants.LAST_NAME;
import static com.store.utils.Constants.SUCCESS;
import static com.store.utils.Constants.SUCCESSFULLY_DELETED;
import static com.store.utils.Constants.SUCCESSFULLY_UPDATED;
import static com.store.utils.Constants.USER_NOT_FOUND;
import static com.store.utils.Constants.VERIFY_ACCOUNT_MESSAGE;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.containsString;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyMap;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
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
    private RegisterUserRequest registerUserRequest;

    @BeforeEach
    void setUp(){
        JacksonTester.initFields(this,new ObjectMapper());
        this.mockMvc = MockMvcBuilders.standaloneSetup(userController)
                .setCustomArgumentResolvers(new CustomerUserDetailsServiceArgumentResolver())
                .setControllerAdvice(new UserException(USER_NOT_FOUND))
                .build();

        registerUserRequest = new RegisterUserRequest(
                "user@gmail.com",
                "user",
                "lastname",
                "address",
                "pass123");
        userResponse = new UserResponse(
                1L,
                "user",
                "lastname",
                "user@gmail.com",
                "USER",
                "address",
                "profile url",
                LocalDateTime.now().toString()
        );
    }

    @Test
    @DisplayName("Testing registering user endpoint")
    void testRegisterUser() throws Exception {
        // arrange
        when(userService.registerUser(any(RegisterUserRequest.class), any(HttpServletRequest.class))).thenReturn(Map.of(SUCCESS,VERIFY_ACCOUNT_MESSAGE));
        // act
        ResultActions resultActions = this.mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/users")
                .contentType(MediaType.APPLICATION_JSON).content(requestJacksonTester.write(registerUserRequest).getJson()));
        // assert
        resultActions.andDo(print()).andExpect(status().isCreated())
                .andExpect(content().string(containsString(VERIFY_ACCOUNT_MESSAGE)));

    }

    @Test
    @DisplayName("Testing get user list")
    void testGetUserList() throws Exception {
        // arrange
        when(userService.getListUsers()).thenReturn(List.of(userResponse));
        // act && assert
        ResultActions resultActions = this.mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/users").contentType(MediaType.APPLICATION_JSON));
        // assert
        resultActions.andDo(print()).andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    @DisplayName("Testing get user by Id")
    @WithMockUser
    void testingGetUserById() throws Exception{
        var expected_response = userResponse;

        when(userService.getUserById(anyLong(),any())).thenReturn(userResponse);
        // act && assert
        ResultActions resultActions = this.mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/users/{id}",1).contentType(MediaType.APPLICATION_JSON));
        // assert
        resultActions.andDo(print()).andExpect(status().isOk())
                .andExpect(content().string(containsString(expected_response.email())))
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    @DisplayName("test updating user account")
    void  testUpdatingUser() throws Exception {
        String fileName = new FileSystemResource("profile_for_testing.png").getFile().getName();
        MockMultipartFile profile = new MockMultipartFile("profile",fileName,MediaType.MULTIPART_FORM_DATA_VALUE,fileName.getBytes());
        Map<String,String> userInfo = new HashMap<>();
        userInfo.put(LAST_NAME,"user");
        userInfo.put(FIRST_NAME,"username");
        MockPart otherUserInfo = new MockPart("otherUserInfo", userInfo.toString().getBytes());

        when(userService.updateUser(anyLong(), any(),any(),anyMap())).thenReturn(userResponse);
        ResultActions response = this.mockMvc.perform(MockMvcRequestBuilders.multipart(HttpMethod.PUT,"/api/v1/users/{id}", 1)
                        .part(otherUserInfo)
                        .file(profile)
                        .contentType(MediaType.MULTIPART_FORM_DATA));

        response.andDo(print()).andExpect(status().isOk()).andExpect(jsonPath("$.lastName",is(userResponse.lastName())));
    }


    @Test
    @DisplayName("test deleting user account")
    void  testDeletingUser() throws Exception {
        when(userService.deleteUser(anyLong(),any(CustomerUserDetailsService.class))).thenReturn(Map.of(SUCCESS,SUCCESSFULLY_DELETED));
        ResultActions response = this.mockMvc.perform(MockMvcRequestBuilders.delete("/api/v1/users/{id}", 1)
                .contentType(MediaType.APPLICATION_JSON));
        response.andDo(print()).andExpect(status().isOk());
        response.andExpect(jsonPath("$.success",is(SUCCESSFULLY_DELETED)));
    }
}
