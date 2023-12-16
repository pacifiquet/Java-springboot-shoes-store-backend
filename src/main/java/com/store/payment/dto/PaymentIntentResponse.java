package com.store.payment.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PaymentIntentResponse {
    private PaymentIntentData data;

    @Data
    static class PaymentIntentData {
        private String id;
        private String type;
        private PaymentIntentAttributes attributes;
    }

    @Data
    static class PaymentIntentAttributes {
        private int amount;
        @JsonProperty("capture_type")
        private String captureType;

        @JsonProperty("client_key")
        private String clientKey;

        private String currency;
        private String description;
        private boolean livemode;

        @JsonProperty("statement_descriptor")
        private String statementDescriptor;

        private String status;

        @JsonProperty("last_payment_error")
        private String lastPaymentError;

        @JsonProperty("payment_method_allowed")
        private List<String> paymentMethodAllowed;

        private List<Object> payments;
        @JsonProperty("next_action")
        private Object nextAction;

        @JsonProperty("payment_method_options")
        private PaymentMethodOptions paymentMethodOptions;

        private Object metadata;

        @JsonProperty("setup_future_usage")
        private Object setupFutureUsage;

        @JsonProperty("created_at")
        @JsonFormat(shape = JsonFormat.Shape.NUMBER)
        private long createdAt;

        @JsonProperty("updated_at")
        @JsonFormat(shape = JsonFormat.Shape.NUMBER)
        private long updatedAt;

    }
    @Data
    static class PaymentMethodOptions{
        private CardOptions card;
    }
    @Data
    static class CardOptions {
        @JsonProperty("request_three_d_secure")
        private String requestThreeDSecure;
    }
}
