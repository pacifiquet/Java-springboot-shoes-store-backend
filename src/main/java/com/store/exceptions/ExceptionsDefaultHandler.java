package com.store.exceptions;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.HttpClientErrorException;

import java.nio.file.AccessDeniedException;
import java.time.LocalDateTime;
import java.util.Objects;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.FORBIDDEN;

@RestControllerAdvice
public class ExceptionsDefaultHandler {
    @ExceptionHandler({UserException.class, UsernameNotFoundException.class, DisabledException.class, ProductException.class,IllegalArgumentException.class, ReviewException.class})
    ResponseEntity<ApiErrorMessage> handleExceptionMessage(HttpServletRequest request, Exception exception) {
        ApiErrorMessage apiErrorMessage = new ApiErrorMessage(
                request.getRequestURI(),
                exception.getMessage(),
                LocalDateTime.now().toString(),
                BAD_REQUEST.value()
        );
        return ResponseEntity.status(BAD_REQUEST).body(apiErrorMessage);
    }

    @ExceptionHandler({BadCredentialsException.class, AccessDeniedException.class})
    ResponseEntity<ApiErrorMessage> handleBandCredentialsExceptionMessage(HttpServletRequest request, Exception exception) {
        ApiErrorMessage apiErrorMessage = new ApiErrorMessage(
                request.getRequestURI(),
                exception.getMessage(),
                LocalDateTime.now().toString(),
                FORBIDDEN.value()
        );
        return ResponseEntity.status(FORBIDDEN).body(apiErrorMessage);
    }

    @ExceptionHandler({MethodArgumentNotValidException.class, HttpClientErrorException.class, PaymentException.class})
    public ResponseEntity<ApiErrorMessage> defaultHandler(
            MethodArgumentNotValidException e, HttpServletRequest request) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ApiErrorMessage.builder()
                                .path(request.getServletPath())
                                .message(
                                        Objects.requireNonNull(e.getBindingResult().getFieldError())
                                                .getDefaultMessage())
                                .statusCode(HttpStatus.BAD_REQUEST.value())
                                .timestamp(LocalDateTime.now().toString())
                                .build());
    }
}
