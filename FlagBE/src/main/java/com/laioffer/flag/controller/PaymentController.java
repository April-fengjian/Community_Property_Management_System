package com.laioffer.flag.controller;

import com.laioffer.flag.model.Payment;
import com.laioffer.flag.model.User;
import com.laioffer.flag.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
public class PaymentController {
    PaymentService paymentService;
    @Autowired
    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }
    @PostMapping("/payment")
    public void createPayment(@RequestBody Payment payment, Principal principal) {
        payment.setUser(new User.Builder().setUsername(principal.getName()).build());
        paymentService.addPayment(payment);
    }

    @GetMapping("/payment")
    public List<Payment> getRequestByUser(Principal principal) {
        return paymentService.listByUser(principal.getName());
    }

    @DeleteMapping(value = "/payment/{paymentId}")
    public void deletePayment(@PathVariable Long paymentId) {
        paymentService.deletePaymentById(paymentId);
    }}
