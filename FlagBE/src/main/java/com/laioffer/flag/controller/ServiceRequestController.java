package com.laioffer.flag.controller;

import com.laioffer.flag.model.ServiceRequest;
import com.laioffer.flag.model.User;
import com.laioffer.flag.service.ServiceRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.sql.Date;
import java.util.List;

@RestController
public class ServiceRequestController {
    ServiceRequestService serviceRequestService;

    @Autowired
    public ServiceRequestController(ServiceRequestService serviceRequestService) {
        this.serviceRequestService = serviceRequestService;
    }

    @PostMapping("/serviceRequest/createRequest")
    public void createRequest(@RequestBody ServiceRequest serviceRequest, Principal principal) {
        serviceRequest.setTime(new Date(System.currentTimeMillis()));
        serviceRequest.setTenant(new User.Builder().setUsername(principal.getName()).build());
        serviceRequestService.addRequest(serviceRequest);
    }

    @GetMapping("/serviceRequest/getTenantRequest")
    public List<ServiceRequest> getRequestByTenant(Principal principal) {
        return serviceRequestService.listByTenant(principal.getName());
    }

    @GetMapping("/serviceRequest/getProviderRequest")
    public List<ServiceRequest> getRequestByProvider(Principal principal) {
        return serviceRequestService.listByProvider(principal.getName());
    }

    @GetMapping("/serviceRequest/getAllByStatus")
    public List<ServiceRequest> getAllByStatus(@RequestParam String status) {
        if (status.isEmpty()) {
            return serviceRequestService.listByAll();
        }
        return serviceRequestService.listByStatus(status);
    }
}
