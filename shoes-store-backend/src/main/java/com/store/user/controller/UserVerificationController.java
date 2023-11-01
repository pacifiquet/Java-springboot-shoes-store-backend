package com.store.user.controller;

import com.store.user.service.IVerificationTokenService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/users/account")
@Tag(name = "User Verification Controller")
public record UserVerificationController(IVerificationTokenService verificationTokenService) {
    @GetMapping("/verifyRegistration")
    @Operation(summary = "verify registered user")
    ResponseEntity<Map<String, String>> verifyUser(@RequestParam(value = "token") String token) {
        return ResponseEntity.ok(verificationTokenService.validateVerificationToken(token));
    }

    @GetMapping("/requestNewToken")
    @Operation(summary = " request a new token for verification")
    ResponseEntity<Map<String, String>> resendToken(@RequestParam(value = "oldToken") String oldToken) {
        return ResponseEntity.ok(verificationTokenService.requestNewToken(oldToken));
    }
}
