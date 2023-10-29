package com.store.email;

import lombok.Builder;

@Builder
public record EmailContent(String toEmail,String subject,String url,String recipientName) {
}
