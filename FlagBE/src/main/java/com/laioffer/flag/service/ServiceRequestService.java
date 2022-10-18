package com.laioffer.flag.service;

import com.laioffer.flag.model.ServiceRequest;
import com.laioffer.flag.repository.ServiceRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
