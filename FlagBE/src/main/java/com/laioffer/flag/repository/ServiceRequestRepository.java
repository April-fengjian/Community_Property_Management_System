package com.laioffer.flag.repository;

import com.laioffer.flag.model.ServiceRequest;
import com.laioffer.flag.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ServiceRequestRepository extends JpaRepository<ServiceRequest, Long> {
    List<ServiceRequest> findByHost(User user);
    ServiceRequest findByIdAndHost(Long id, User host);
}
