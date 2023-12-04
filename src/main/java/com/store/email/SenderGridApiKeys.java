package com.store.email;

import lombok.Builder;

@Builder
public record SenderGridApiKeys(String senderGridApiKey, String senderGridEmail) {
}
