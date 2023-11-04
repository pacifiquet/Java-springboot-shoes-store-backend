package com.store.user.controller;

import com.store.user.dto.PasswordRequest;
import com.store.user.dto.PasswordRestRequest;
import com.store.user.security.CustomerUserDetailsService;
import com.store.user.service.IPasswordResetTokenService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

import static org.springframework.http.HttpStatus.CREATED;

@Tag(name = "Password Reset and Forgot Controller")
@RestController
@RequestMapping("/api/v1/users/account/password")
public record PasswordResetController(IPasswordResetTokenService passwordResetTokenService) {

    @GetMapping("/forgot")
    @Operation(summary = "Forgot Password Request")
    ResponseEntity<Map<String, String>> forgotPassword(@RequestParam String email) {
        return ResponseEntity.ok(passwordResetTokenService.resetPassword(email));
    }

    @PostMapping("/save")
    @Operation(summary = "Save Reset Password")
    ResponseEntity<Map<String, String>> saveResetPassword(@RequestParam String token, @Validated @RequestBody PasswordRestRequest request) {
        return ResponseEntity.status(CREATED).body(passwordResetTokenService.savePassword(token, request));
    }

    @PostMapping("/change")
    @Operation(summary = "Request Change Password")
    ResponseEntity<Map<String, String>> changePassword(@Validated @RequestBody PasswordRequest request, @AuthenticationPrincipal CustomerUserDetailsService detailsService) {
        return ResponseEntity.status(CREATED).body(passwordResetTokenService.changePassword(request, detailsService));
    }
}
