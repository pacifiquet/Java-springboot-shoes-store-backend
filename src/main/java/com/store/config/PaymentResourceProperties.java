package com.store.config;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.List;
import java.util.Map;

@ConfigurationProperties(prefix = "pay-mongo.payment-resource.data")
@Configuration
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentResourceProperties {
    private Attributes  attributes;
    @Data
    public static class  Attributes{
        private int amount;
        private String currency;
        private String captureType;
        private List<String> paymentMethodAllowed;
        private PaymentMethodOptions paymentMethodOptions;
    }
    @Data
    public static class  PaymentMethodOptions {
        private Map<String,String> card;
    }




}
