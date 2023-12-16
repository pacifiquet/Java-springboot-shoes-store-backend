package com.store.payment.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.store.config.PaymentResourceProperties;
import com.store.config.PaymentServiceConfigProperties;
import com.store.payment.dto.PaymentIntentResponse;
import com.store.payment.utils.PaymentUtils;
import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.List;

import static com.store.payment.utils.PaymentUtils.getRequestData;

@AllArgsConstructor
@Service
@Slf4j
public class PaymentService implements IPaymentService{
    private RestTemplate restTemplate;
    private PaymentServiceConfigProperties paymentServiceConfigProperties;
    private final PaymentResourceProperties paymentResourceProperties;
    private final ObjectMapper objectMapper;
    @Override
    @SneakyThrows(HttpClientErrorException.class)
    public List<String> listOfPaymentMethods() {
        String body = "";
        HttpEntity<String> httpEntity = PaymentUtils.getStringHttpEntity(paymentServiceConfigProperties,body);
        return restTemplate.exchange(paymentServiceConfigProperties.possiblePaymentMethodsUrl(), HttpMethod.GET, httpEntity, new ParameterizedTypeReference<List<String>>() {
        }).getBody();
    }


    @Override
    public PaymentIntentResponse createPaymentIntent() {
        paymentResourceProperties.getAttributes().setAmount(3000);
        try {
            String requestData = getRequestData(paymentResourceProperties);
            HttpEntity<String> httpEntity = PaymentUtils.getStringHttpEntity(paymentServiceConfigProperties,requestData);
            ResponseEntity<String> response = restTemplate.exchange(paymentServiceConfigProperties.paymentIntentUrl(), HttpMethod.POST, httpEntity, new ParameterizedTypeReference<String>() {});
            PaymentIntentResponse paymentIntentResponse = objectMapper.readValue(response.getBody(), PaymentIntentResponse.class);
            System.out.println(paymentIntentResponse);
            return paymentIntentResponse;

        } catch (JsonProcessingException | HttpClientErrorException e) {
           log.error(e.getMessage());
        }
        return null;
    }

    @Override
    public PaymentIntentResponse retrievePaymentIntent(String id) {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        httpHeaders.add(HttpHeaders.AUTHORIZATION,"Basic "+paymentServiceConfigProperties.secretKey());
        HttpEntity<String> httpEntity  = new HttpEntity<>("body",httpHeaders);
        PaymentIntentResponse paymentIntentResponse = restTemplate.exchange(paymentServiceConfigProperties.paymentIntentUrl()+id, HttpMethod.GET, httpEntity, new ParameterizedTypeReference<PaymentIntentResponse>() {
        }).getBody();
        System.out.println(paymentIntentResponse);
        return paymentIntentResponse;
    }

}
