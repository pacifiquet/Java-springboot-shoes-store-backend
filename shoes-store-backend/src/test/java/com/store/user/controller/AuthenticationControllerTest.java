package com.store.user.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.store.user.dto.LoginRequest;
import com.store.user.service.IAuthenticationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

@ExtendWith(MockitoExtension.class)
@ActiveProfiles("test")
class AuthenticationControllerTest {
    private MockMvc mockMvc;
    @Mock
    private IAuthenticationService authenticationService;
    @InjectMocks
    private AuthenticationController authenticationController;

    private JacksonTester<LoginRequest> loginRequestJacksonTester;

    @BeforeEach
    void setUp(){
        JacksonTester.initFields(this,new ObjectMapper());
        mockMvc = MockMvcBuilders.standaloneSetup(authenticationController).build();

    }

//    @Test
//    @DisplayName("Test Success Authentication")
//    void testSuccessAuthenticate()  throws Exception{
//        // arrange
//        Map<String,String> tokens = new HashMap<>();
//        tokens.put("jwtToken","valid token");
//        tokens.put("jwtRefreshToken","refresh token");
//        LoginResponse loginResponse = LoginResponse.builder()
//                .role("USER")
//                .email("user@gmail.com")
//                .id(1L)
//                .firstName("firstName")
//                .lastName("lastname")
//                .tokens(tokens)
//                .build();
//        when(authenticationService.login(any(LoginRequest.class))).thenReturn(loginResponse);
//
//        // act
//        ResultActions actions = mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/auth").contentType(MediaType.APPLICATION_JSON)
//                .content(loginRequestJacksonTester.write(new LoginRequest("user@gmail.com", "pac1234")).getJson()));
//
//        actions.andExpect(status().isOk());
//
//    }
}