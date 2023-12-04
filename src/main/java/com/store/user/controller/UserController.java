package com.store.user.controller;

import com.store.user.dto.RegisterUserRequest;
import com.store.user.dto.UserResponse;
import com.store.user.security.CustomerUserDetailsService;
import com.store.user.service.IUserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

import static org.springframework.http.HttpStatus.CREATED;

@AllArgsConstructor
@Tag(name = "User Controller")
@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    private final IUserService userService;

    /**
     * this endpoint handles a lists of users from a database
     *
     * @return ResponseEntity object
     */
    @GetMapping
    @Operation(summary = "list of users")
    ResponseEntity<List<UserResponse>> userList() {
        return ResponseEntity.ok(userService.getListUsers());
    }

    /**
     * this endpoint get id as param
     * return user of that id if exists
     *
     * @param id this id from url to pathVariables in as method parameter
     * @return response of userResponse
     */
    @GetMapping("/{id}")
    @Operation(summary = "get user by id")
    ResponseEntity<UserResponse> getUserByID(@PathVariable(value = "id") long id, @AuthenticationPrincipal CustomerUserDetailsService customerUserDetailsService) {
        return ResponseEntity.ok(userService.getUserById(id, customerUserDetailsService));
    }

    /**
     * registration user endpoint
     *
     * @param request the request parameter is an object hold request body
     * @return return Long data types as a created user id
     */
    @PostMapping
    @Operation(summary = "user registration")
    ResponseEntity<Map<String, String>> registerUser(@Validated @RequestBody RegisterUserRequest request, final HttpServletRequest servletRequest) {
        return ResponseEntity.status(CREATED).body(userService.registerUser(request, servletRequest));
    }

    /**
     * this method handles user update request
     *
     * @param id      fetch the account to update
     * @param profile user profile
     * @return a message after successful update
     */
    @PutMapping(value = "/{id}",
            consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @Operation(summary = "updating user account")
    ResponseEntity<UserResponse> updateUser(
            @PathVariable long id,
            @RequestParam Map<String, String> otherUserInfo,
            @AuthenticationPrincipal CustomerUserDetailsService customerUserDetailsService,
            @RequestPart(value = "profile", required = false) final MultipartFile profile) {
        return ResponseEntity.ok(userService.updateUser(id, customerUserDetailsService, profile, otherUserInfo));

    }

    /**
     * this method handle delete request
     *
     * @param id to fetch an account to delete
     * @return message after successful delete
     */
    @DeleteMapping("/{id}")
    @Operation(summary = "deleting user account")
    ResponseEntity<Map<String, String>> deleteUser(@PathVariable long id, @AuthenticationPrincipal CustomerUserDetailsService customerUserDetailsService) {
        return ResponseEntity.ok(userService.deleteUser(id, customerUserDetailsService));
    }

    /**
     * this controller handles user profile request
     * @param userDetailsService user logged object parameter
     * @return userResponse object
     */
    @GetMapping("/profile")
    @Operation(summary = "logged in user details")
    ResponseEntity<UserResponse> loggedUser(@AuthenticationPrincipal CustomerUserDetailsService userDetailsService){
        return ResponseEntity.ok(userService.userProfile(userDetailsService));
    }

}
