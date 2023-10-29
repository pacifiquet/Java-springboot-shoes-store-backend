package com.store.email;

import lombok.Builder;

@Builder
public record SendGridApiKey(String senderGridApiKey) {
}
