package com.store.user.controller;

import com.store.user.dto.LoginRequest;
import com.store.user.dto.LoginResponse;
import com.store.user.dto.MessageResponse;
import com.store.user.service.IAuthenticationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/v1/auth")
@Tag(name = "Authentication Controller")
public record AuthenticationController(IAuthenticationService authenticationService) {

    @PostMapping
    @Operation(summary = "Login user endpoint")
    ResponseEntity<LoginResponse> authenticate(@Validated @RequestBody LoginRequest request) {
        System.out.println(request.password() +" "+request.email());
        return ResponseEntity.ok(authenticationService.login(request));
    }

    @GetMapping("/internal")
    @Operation(summary = "update user role to admin role")
    ResponseEntity<MessageResponse> makeAdmin(@Validated @RequestParam String email){
        return ResponseEntity.ok(authenticationService.makeAdmin(email));
    }
}
