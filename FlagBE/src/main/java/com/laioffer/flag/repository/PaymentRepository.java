package com.laioffer.flag.repository;

import com.laioffer.flag.model.Payment;
import com.laioffer.flag.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByUser(User user);

}
