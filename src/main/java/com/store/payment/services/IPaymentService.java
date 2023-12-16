package com.store.payment.services;

import com.store.payment.dto.PaymentIntentResponse;

import java.util.List;

public interface IPaymentService {
    List<String> listOfPaymentMethods();

    PaymentIntentResponse createPaymentIntent();

    PaymentIntentResponse retrievePaymentIntent(String id);
}
