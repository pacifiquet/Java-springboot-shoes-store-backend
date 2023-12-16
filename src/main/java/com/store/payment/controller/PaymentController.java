package com.store.payment.controller;

import com.store.payment.dto.PaymentIntentResponse;
import com.store.payment.services.IPaymentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;

@AllArgsConstructor
@RestController
@RequestMapping(value = "/api/v1/payments/")
@Tag(name = "Payment Controller")
public class PaymentController {
    private final IPaymentService paymentService;

    @GetMapping(value = "methods")
    @Operation(summary = "Available payment methods")
    ResponseEntity<List<String>> possibleMerchantPayment(){
        return ResponseEntity.ok(paymentService.listOfPaymentMethods());
    }

    @PostMapping(value = "create-payment")
    @Operation(summary = "create payment")
    public ResponseEntity<PaymentIntentResponse> createPaymentIntent(){
        return ResponseEntity.status(CREATED).body(paymentService.createPaymentIntent());
    }

    @GetMapping(value = "retrieve-payment/{id}")
    @Operation(summary = "Retrieve a PaymentIntent")
    ResponseEntity<PaymentIntentResponse> retrievePaymentIntent(@PathVariable String id){
        return ResponseEntity.ok(paymentService.retrievePaymentIntent(id));
    }

}
