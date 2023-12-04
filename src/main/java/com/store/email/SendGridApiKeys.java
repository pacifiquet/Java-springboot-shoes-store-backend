package com.store.email;

import lombok.Builder;

@Builder
public record SendGridApiKeys(String senderGridApiKey, String senderGridEmail) {
}
