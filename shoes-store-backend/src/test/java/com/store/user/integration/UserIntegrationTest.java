package com.store.user.integration;

import com.store.config.DatabasePostgresqlTestContainer;
import com.store.exceptions.ApiErrorMessage;
import com.store.user.dto.MessageResponse;
import com.store.user.dto.UserResponse;
import com.store.user.models.Role;
import com.store.user.models.User;
import com.store.user.repository.IUserRepository;
import com.store.user.security.CustomerUserDetailsService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.testcontainers.containers.PostgreSQLContainer;

import javax.crypto.SecretKey;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.http.HttpStatus.CREATED;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
class UserIntegrationTest {
    @ServiceConnection
    static PostgreSQLContainer<?>postgreSQLContainer = DatabasePostgresqlTestContainer.getInstance();

    @BeforeAll
    static void startDB(){
        postgreSQLContainer.start();
    }

    @Autowired
    private TestRestTemplate restTemplate;
    @Autowired
    private IUserRepository userRepository;
    @MockBean
    private PasswordEncoder passwordEncoder;

    @LocalServerPort
    private int port;
    private static final String TOKEN_PREFIX = "Bearer ";
    private String baseUrl;
    private User user;
    @Value("${jwt.testing-config-auth-token.secret-key}")
    private String secretKey;

    @BeforeEach
    void setUp(){
        this.baseUrl = "http://localhost:"+port;
        user = User.builder()
                .email("user@gmail.com")
                .firstName("paco")
                .lastName("user")
                .createdAt(LocalDateTime.now())
                .password(passwordEncoder.encode("pass123"))
                .role(Role.ADMIN)
                .build();
        userRepository.deleteAll();
    }


//    @Test
//    @DisplayName("Test register user endpoint")
//    void testRegisterUser(){
//        // arrange
//        var url = this.baseUrl +"/api/v1/users";
//        Map<String,String> requestBody = new HashMap<>();
//        requestBody.put("email","user@gmail.com");
//        requestBody.put("firstName","firstName");
//        requestBody.put("lastName","lastName");
//        requestBody.put("password","pass1234");
//        HttpHeaders httpHeaders = new HttpHeaders();
//        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
//        HttpEntity<Map<String,String>> entity = new HttpEntity<>(requestBody,httpHeaders);
//        // act
//        ResponseEntity<Long> response = restTemplate.exchange(url, HttpMethod.POST, entity, Long.class);
//        // assert
//        assertEquals(CREATED,response.getStatusCode());
//    }
//    @Test
//    @DisplayName("Test Get users list endpoint with authorized user")
//    void testGetUsersList() {
//        // arrange
//        var url = this.baseUrl +"/api/v1/users";
//        User saved = userRepository.save(user);
//        UserDetails userDetails = CustomerUserDetailsService.build(saved);
//        byte[] decode = Decoders.BASE64.decode(secretKey);
//
//        String adminToken = Jwts.builder()
//                .subject(userDetails.getUsername())
//                .issuedAt(new Date(System.currentTimeMillis()))
//                .expiration(new Date(System.currentTimeMillis() + 180000))
//                .signWith(Keys.hmacShaKeyFor(decode))
//                .compact();
//
//        HttpHeaders httpHeaders = new HttpHeaders();
//        httpHeaders.setAccept(List.of(MediaType.APPLICATION_JSON));
//        httpHeaders.add(HttpHeaders.AUTHORIZATION,  TOKEN_PREFIX + adminToken);
//        HttpEntity<String> httpEntity = new HttpEntity<>("body",httpHeaders);
//        // act
//        ResponseEntity<List<UserResponse>> response = restTemplate.exchange(url, HttpMethod.GET, httpEntity, new ParameterizedTypeReference<>() {});
//        // assert
//        assertEquals(HttpStatus.OK,response.getStatusCode());
//        assertThat(response.getBody()).isNotNull();
//
//    }
//
//    @Test
//    @DisplayName("Test Get users list endpoint with authorized user")
//    void testGetUserByIDWithAuthorizedUserGetById() {
//        // arrange
//        var url = this.baseUrl +"/api/v1/users";
//        user.setRole(Role.USER);
//        User savedUser = userRepository.save(user);
//
//        UserDetails userDetails = CustomerUserDetailsService.build(savedUser);
//        byte[] decode = Decoders.BASE64.decode(secretKey);
//
//        String userToken = Jwts.builder()
//                .subject(userDetails.getUsername())
//                .issuedAt(new Date(System.currentTimeMillis()))
//                .expiration(new Date(System.currentTimeMillis() + 180000))
//                .signWith(Keys.hmacShaKeyFor(decode))
//                .compact();
//
//        HttpHeaders httpHeaders = new HttpHeaders();
//        httpHeaders.setAccept(List.of(MediaType.APPLICATION_JSON));
//        httpHeaders.add(HttpHeaders.AUTHORIZATION,TOKEN_PREFIX + userToken);
//        HttpEntity<String> httpEntity = new HttpEntity<>("body",httpHeaders);
//        // act
//        ResponseEntity<UserResponse> response = restTemplate.exchange(url +"/"+savedUser.getId(), HttpMethod.GET, httpEntity, new ParameterizedTypeReference<>() {});
//        // assert
//        assertEquals(HttpStatus.OK,response.getStatusCode());
//        assertEquals(savedUser.getEmail(), Objects.requireNonNull(response.getBody()).email());
//
//    }
//
//    @Test
//    @DisplayName("Test Get users list endpoint with unauthorized user")
//    void testUnauthorizedUserGetUsersList() {
//        // arrange
//        var url = this.baseUrl +"/api/v1/users";
//        HttpHeaders httpHeaders = new HttpHeaders();
//        httpHeaders.setAccept(List.of(MediaType.APPLICATION_JSON));
//        HttpEntity<String> httpEntity = new HttpEntity<>("body",httpHeaders);
//        // act
//        ResponseEntity<List<UserResponse>> response = restTemplate.exchange(url, HttpMethod.GET, httpEntity, new ParameterizedTypeReference<>() {});
//        // assert
//        assertEquals(HttpStatus.FORBIDDEN,response.getStatusCode());
//
//    }
//
//
//    @Test
//    @DisplayName("Test Get users list endpoint with unauthorized user")
//    void testUnauthorizedUserGetById() {
//        // arrange
//        var url = this.baseUrl +"/api/v1/users/";
//        User savedUser = userRepository.save(user);
//        HttpHeaders httpHeaders = new HttpHeaders();
//        httpHeaders.setAccept(List.of(MediaType.APPLICATION_JSON));
//        HttpEntity<String> httpEntity = new HttpEntity<>("body",httpHeaders);
//        // act
//        ResponseEntity<UserResponse> response = restTemplate.exchange(url+savedUser.getId(), HttpMethod.GET, httpEntity, new ParameterizedTypeReference<>() {});
//        // assert
//        assertEquals(HttpStatus.FORBIDDEN,response.getStatusCode());
//
//    }
//
//    @Test
//    @DisplayName("Test updated user endpoint with unauthorized")
//    void testUpdateUserWithNoAuthority(){
//        var url = this.baseUrl +"/api/v1/users/";
//        User savedUser = userRepository.save(user);
//        HttpHeaders httpHeaders = new HttpHeaders();
//        httpHeaders.setAccept(List.of(MediaType.APPLICATION_JSON));
//
//        HashMap<String, String> requestBody = new HashMap<>();
//        requestBody.put("firstName","firstName");
//        requestBody.put("lastName","lastName");
//
//        HttpEntity<Map<String,String>> httpEntity = new HttpEntity<>(requestBody,httpHeaders);
//        // act
//        ResponseEntity<ApiErrorMessage> response = restTemplate.exchange(url+savedUser.getId(), HttpMethod.PUT, httpEntity, new ParameterizedTypeReference<>() {});
//        // assert
//        assertEquals(HttpStatus.FORBIDDEN,response.getStatusCode());
//    }
//
//    @Test
//    @DisplayName("Test updated user endpoint with valid auth")
//    void testUpdateUserWithAuthority(){
//        var url = this.baseUrl +"/api/v1/users/";
//        String expected_response = "successfully updated";
//        user.setRole(Role.USER);
//        User savedUser = userRepository.save(user);
//
//        SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey));
//        UserDetails userDetails = CustomerUserDetailsService.build(savedUser);
//        String jwtToken = Jwts.builder().subject(userDetails.getUsername()).issuedAt(new Date(System.currentTimeMillis()))
//                .expiration(new Date(System.currentTimeMillis() + 180000))
//                .signWith(key).compact();
//
//        HttpHeaders httpHeaders = new HttpHeaders();
//        httpHeaders.setAccept(List.of(MediaType.APPLICATION_JSON));
//        httpHeaders.add(HttpHeaders.AUTHORIZATION,TOKEN_PREFIX+jwtToken);
//
//        HashMap<String, String> requestBody = new HashMap<>();
//        requestBody.put("firstName","firstName");
//        requestBody.put("lastName","lastName");
//
//        HttpEntity<Map<String,String>> httpEntity = new HttpEntity<>(requestBody,httpHeaders);
//        // act
//        ResponseEntity<MessageResponse> response = restTemplate.exchange(url+savedUser.getId(), HttpMethod.PUT, httpEntity, new ParameterizedTypeReference<>() {});
//        // assert
//        assertEquals(HttpStatus.OK,response.getStatusCode());
//        assertEquals(expected_response, Objects.requireNonNull(response.getBody()).message());
//
//    }
//
//    @Test
//    @DisplayName("Test updated user endpoint with valid auth but other account")
//    void testUpdateUserWithAuthorityBUtOtherAccount(){
//        var expected_response = new ApiErrorMessage("/api/v1/users/-1", "INVALID ACCESS", LocalDateTime.now().toString(), HttpStatus.BAD_REQUEST.value());
//        user.setRole(Role.USER);
//        User savedUser = userRepository.save(user);
//        var url = this.baseUrl +"/api/v1/users/-1";
//
//        SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey));
//        UserDetails userDetails = CustomerUserDetailsService.build(savedUser);
//        String jwtToken = Jwts.builder().subject(userDetails.getUsername()).issuedAt(new Date(System.currentTimeMillis()))
//                .expiration(new Date(System.currentTimeMillis() + 180000))
//                .signWith(key).compact();
//
//        HttpHeaders httpHeaders = new HttpHeaders();
//        httpHeaders.setAccept(List.of(MediaType.APPLICATION_JSON));
//        httpHeaders.add(HttpHeaders.AUTHORIZATION,TOKEN_PREFIX+jwtToken);
//
//        HashMap<String, String> requestBody = new HashMap<>();
//        requestBody.put("firstName","firstName");
//        requestBody.put("lastName","lastName");
//
//        HttpEntity<Map<String,String>> httpEntity = new HttpEntity<>(requestBody,httpHeaders);
//        // act
//        ResponseEntity<ApiErrorMessage> response = restTemplate.exchange(url, HttpMethod.PUT, httpEntity, new ParameterizedTypeReference<>() {});
//        // assert
//        assertEquals(HttpStatus.BAD_REQUEST,response.getStatusCode());
//        assertEquals(expected_response.message(), Objects.requireNonNull(response.getBody()).message());
//    }
//
//
//    @Test
//    @DisplayName("Test updated user endpoint with unauthorized")
//    void testDeleteUserWithNoAuthority(){
//        var url = this.baseUrl +"/api/v1/users/-1";
//        HttpHeaders httpHeaders = new HttpHeaders();
//        httpHeaders.setAccept(List.of(MediaType.APPLICATION_JSON));
//        HttpEntity<Void> httpEntity = new HttpEntity<>(null,httpHeaders);
//        // act
//        ResponseEntity<ApiErrorMessage> response = restTemplate.exchange(url, HttpMethod.DELETE, httpEntity, new ParameterizedTypeReference<>() {});
//        // assert
//        assertEquals(HttpStatus.FORBIDDEN,response.getStatusCode());
//    }
//
//    @Test
//    @DisplayName("Test updated user endpoint with valid auth but other account")
//    void testDeleteUserWithAuthorityBUtOtherAccount(){
//        user.setRole(Role.USER);
//        User savedUser = userRepository.save(user);
//        var url = this.baseUrl +"/api/v1/users/-1";
//        var expected_response = new ApiErrorMessage("/api/v1/users/"+savedUser.getId(), "INVALID ACCESS", LocalDateTime.now().toString(), HttpStatus.BAD_REQUEST.value());
//
//        SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey));
//        UserDetails userDetails = CustomerUserDetailsService.build(savedUser);
//        String jwtToken = Jwts.builder().subject(userDetails.getUsername()).issuedAt(new Date(System.currentTimeMillis()))
//                .expiration(new Date(System.currentTimeMillis() + 180000))
//                .signWith(key).compact();
//
//        HttpHeaders httpHeaders = new HttpHeaders();
//        httpHeaders.setAccept(List.of(MediaType.APPLICATION_JSON));
//        httpHeaders.add(HttpHeaders.AUTHORIZATION,TOKEN_PREFIX+jwtToken);
//
//        HttpEntity<Void> httpEntity = new HttpEntity<>(null,httpHeaders);
//        // act
//        ResponseEntity<ApiErrorMessage> response = restTemplate.exchange(url, HttpMethod.DELETE, httpEntity, new ParameterizedTypeReference<>() {});
//        // assert
//        assertEquals(HttpStatus.BAD_REQUEST,response.getStatusCode());
//        assertEquals(expected_response.message(), Objects.requireNonNull(response.getBody()).message());
//    }
//
//
//    @Test
//    @DisplayName("Test updated user endpoint with valid auth but other account")
//    void testDeleteUserAccountWithAuthority(){
//        user.setRole(Role.USER);
//        User savedUser = userRepository.save(user);
//        var url = this.baseUrl +"/api/v1/users/"+savedUser.getId();
//        var expected_response = new ApiErrorMessage("/api/v1/users/"+savedUser.getId(), "INVALID ACCESS", LocalDateTime.now().toString(), HttpStatus.BAD_REQUEST.value());
//
//        SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey));
//        UserDetails userDetails = CustomerUserDetailsService.build(savedUser);
//        String jwtToken = Jwts.builder().subject(userDetails.getUsername()).issuedAt(new Date(System.currentTimeMillis()))
//                .expiration(new Date(System.currentTimeMillis() + 180000))
//                .signWith(key).compact();
//
//        HttpHeaders httpHeaders = new HttpHeaders();
//        httpHeaders.setAccept(List.of(MediaType.APPLICATION_JSON));
//        httpHeaders.add(HttpHeaders.AUTHORIZATION,TOKEN_PREFIX+jwtToken);
//
//        HttpEntity<Void> httpEntity = new HttpEntity<>(null,httpHeaders);
//        // act
//        ResponseEntity<ApiErrorMessage> response = restTemplate.exchange(url, HttpMethod.DELETE, httpEntity, new ParameterizedTypeReference<>() {});
//        // assert
//        assertEquals(HttpStatus.OK,response.getStatusCode());
//        assertThat(response.getBody()).isNotNull();
//    }

}
