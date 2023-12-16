package com.store.payment.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.store.config.PaymentResourceProperties;
import com.store.config.PaymentServiceConfigProperties;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import java.util.List;

public class PaymentUtils {

   private PaymentUtils() {}

    public static HttpEntity<String> getStringHttpEntity(PaymentServiceConfigProperties paymentServiceConfigProperties, String requestBody) {
        HttpHeaders httpHeaders =  new HttpHeaders();
        httpHeaders.setAccept(List.of(MediaType.APPLICATION_JSON));
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);

        httpHeaders.add(HttpHeaders.AUTHORIZATION, "Basic "+paymentServiceConfigProperties.secretKey());
        return new HttpEntity<>(requestBody, httpHeaders);
    }

    public static String getRequestData(PaymentResourceProperties paymentResourceProperties) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        // Creating the root ObjectNode
        ObjectNode rootNode = objectMapper.createObjectNode();
        // Creating the data ObjectNode
        ObjectNode dataNode = objectMapper.createObjectNode();
        // Creating the attributes ObjectNode
        ObjectNode attributesNode = objectMapper.createObjectNode();
        attributesNode.put("amount", paymentResourceProperties.getAttributes().getAmount());
        ArrayNode paymentMethodsNode = objectMapper.createArrayNode();
        paymentMethodsNode.add("atome");
        paymentMethodsNode.add("card");
        paymentMethodsNode.add("dob");
        paymentMethodsNode.add("paymaya");
        paymentMethodsNode.add("billease");
        paymentMethodsNode.add("gcash");
        paymentMethodsNode.add("grab_pay");
        attributesNode.set("payment_method_allowed", paymentMethodsNode);
        // Creating the payment_method_options ObjectNode
        ObjectNode paymentOptionsNode = objectMapper.createObjectNode();
        ObjectNode cardNode = objectMapper.createObjectNode();
        cardNode.put("request_three_d_secure", "any");
        paymentOptionsNode.set("card", cardNode);
        attributesNode.set("payment_method_options", paymentOptionsNode);
        // Setting the remaining attributes
        attributesNode.put("currency", paymentResourceProperties.getAttributes().getCurrency());
        attributesNode.put("capture_type", paymentResourceProperties.getAttributes().getCaptureType());
        // Adding attributesNode to dataNode
        dataNode.set("attributes", attributesNode);
        // Adding dataNode to rootNode
        rootNode.set("data", dataNode);

        // Converting the JSON structure to a string
        return objectMapper.writeValueAsString(rootNode);
    }

}
