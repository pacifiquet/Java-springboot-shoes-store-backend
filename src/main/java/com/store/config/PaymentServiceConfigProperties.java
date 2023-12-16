package com.store.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "payment-service")
public record PaymentServiceConfigProperties(
        String  possiblePaymentMethodsUrl,
        String paymentIntentUrl,
        String secretKey
) {


}
