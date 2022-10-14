package com.laioffer.flag.repository;

import com.laioffer.flag.model.ServiceRequest;
import com.laioffer.flag.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServiceRequestRepository extends JpaRepository<ServiceRequest, Long> {
    List<ServiceRequest> findByHost(User user);
    ServiceRequest findByIdAndHost(Long id, User host);
}
