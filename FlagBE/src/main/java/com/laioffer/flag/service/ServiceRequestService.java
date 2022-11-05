package com.laioffer.flag.service;

import com.laioffer.flag.exception.ServiceRequestNotExistException;
import com.laioffer.flag.exception.StatusUpdateException;
import com.laioffer.flag.model.ServiceRequest;
import com.laioffer.flag.model.User;
import com.laioffer.flag.repository.ServiceRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

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
        return serviceRequestRepository.findByTenant(new User.Builder().setUsername(username).build(), Sort.by("time").descending());
    }

    public List<ServiceRequest> listByProvider(String username) {
        return serviceRequestRepository.findByProvider(new User.Builder().setUsername(username).build(), Sort.by("time").ascending());
    }

    public List<ServiceRequest> listByStatus(String category) {
        return serviceRequestRepository.findServiceRequestsByStatus(category, Sort.by("time").ascending());
//        return serviceRequestRepository.findServiceRequestsByStatusAndTenant(category, new User.Builder().setUsername(username).build(), Sort.by("time").ascending());
    }

    public List<ServiceRequest> listByStatusByTenant(String category, String username) {
//        return serviceRequestRepository.findServiceRequestsByStatusContaining(category, Sort.by("time").ascending());
        return serviceRequestRepository.findServiceRequestsByStatusAndTenant(category, new User.Builder().setUsername(username).build(), Sort.by("time").ascending());
    }
    public List<ServiceRequest> listByAll() {
        return serviceRequestRepository.findAll();
    }

    public void cancelRequest(Long id) {
        serviceRequestRepository.deleteById(id);
    }
    public void assignRequest(Long id, String name) {
        ServiceRequest request = serviceRequestRepository.findById(id).orElse(null);
        request.setProvider(new User.Builder().setUsername(name).build());
        request.setStatus("processing");
        serviceRequestRepository.save(request);
    }
    public void finishRequest(Long id) {
        ServiceRequest request = serviceRequestRepository.findById(id).orElse(null);
        request.setStatus("finish");
        serviceRequestRepository.save(request);
    }

}
