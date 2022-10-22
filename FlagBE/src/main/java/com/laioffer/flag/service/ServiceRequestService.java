package com.laioffer.flag.service;

import com.laioffer.flag.model.ServiceRequest;
import com.laioffer.flag.model.User;
import com.laioffer.flag.repository.ServiceRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceRequestService {
    ServiceRequestRepository serviceRequestRepository;

    @Autowired
    public ServiceRequestService(ServiceRequestRepository serviceRequestRepository) {
        this.serviceRequestRepository = serviceRequestRepository;
    }

    public void addRequest(ServiceRequest serviceRequest) {
        serviceRequestRepository.save(serviceRequest);
    }

    public List<ServiceRequest> listByTenant(String username) {
        return serviceRequestRepository.findByTenant(new User.Builder().setUsername(username).build());
    }

    public List<ServiceRequest> listByProvider(String username) {
        return serviceRequestRepository.findByProvider(new User.Builder().setUsername(username).build());
    }

    public List<ServiceRequest> listByStatus(String category) {
        return serviceRequestRepository.findServiceRequestsByStatusContaining(category);
    }

    public List<ServiceRequest> listByAll() {
        return serviceRequestRepository.findAll();
    }
}
