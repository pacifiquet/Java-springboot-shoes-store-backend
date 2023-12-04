package com.store.exceptions;

import lombok.Builder;

@Builder
public record ApiErrorMessage(String path, String message, String timestamp, int statusCode) {
}
