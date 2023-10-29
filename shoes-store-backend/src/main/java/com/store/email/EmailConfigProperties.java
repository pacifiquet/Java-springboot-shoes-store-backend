package com.store.email;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "email-config")
public record EmailConfigProperties(String emailSender,String senderGrid) {
}
