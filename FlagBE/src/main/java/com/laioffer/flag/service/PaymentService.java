package com.laioffer.flag.service;

import com.laioffer.flag.model.Payment;
import com.laioffer.flag.model.ServiceRequest;
import com.laioffer.flag.model.User;
import com.laioffer.flag.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {
    PaymentRepository paymentRepository;

    @Autowired
    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    public void addPayment(Payment payment) {
        paymentRepository.save(payment);
    }

    public List<Payment> listByUser(String username) {
        return paymentRepository.findByUser(new User.Builder().setUsername(username).build());
    }



}
