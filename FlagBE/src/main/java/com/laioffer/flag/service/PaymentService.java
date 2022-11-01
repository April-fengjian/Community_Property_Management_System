package com.laioffer.flag.service;

import com.laioffer.flag.exception.AnnouncementNotExistException;
import com.laioffer.flag.exception.PaymentNotExistException;
import com.laioffer.flag.model.Announcement;
import com.laioffer.flag.model.Payment;
import com.laioffer.flag.model.ServiceRequest;
import com.laioffer.flag.model.User;
import com.laioffer.flag.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

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

    @Transactional(isolation = Isolation.SERIALIZABLE)
    public void deletePaymentById(Long announcementId) throws PaymentNotExistException {
        Payment payment = paymentRepository.findById(announcementId).orElse(null);
        if (payment == null) {
            throw new AnnouncementNotExistException("Payment doesn't exist");
        }
        paymentRepository.deleteById(announcementId);
    }
}
