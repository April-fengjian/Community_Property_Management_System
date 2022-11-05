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

    @GetMapping("/serviceRequest/getAllRequest")
    public List<ServiceRequest> getAllRequest(Principal principal) {
        return serviceRequestService.listByAll();
    }
    @GetMapping("/serviceRequest/getTenantRequest")
    public List<ServiceRequest> getRequestByTenant(Principal principal) {
        return serviceRequestService.listByTenant(principal.getName());
    }

    @GetMapping("/serviceRequest/getProviderRequest")
    public List<ServiceRequest> getRequestByProvider(Principal principal) {
        return serviceRequestService.listByProvider(principal.getName());
    }

    @GetMapping("/serviceRequest/getAllByStatus/{status}")
    public List<ServiceRequest> getAllByStatus(@PathVariable String status) {
        if (status.isEmpty()) {
            return serviceRequestService.listByAll();
        }
        return serviceRequestService.listByStatus(status);
    }
    @GetMapping("/serviceRequest/getMyByStatus/{status}")
    public List<ServiceRequest> getAllByStatus(@PathVariable String status,Principal principal) {
        if (status.isEmpty()) {
            return serviceRequestService.listByAll();
        }
        return serviceRequestService.listByStatusByTenant(status, principal.getName());
    }


    @DeleteMapping("/serviceRequest/cancelRequest")
    public void cancelRequest(@RequestBody Long requestId, Principal principal) {
        serviceRequestService.cancelRequest(requestId);
    }
    @PostMapping("/serviceRequest/assignRequest")
    public void assignRequest(@RequestBody Long id, Principal principal) {
        serviceRequestService.assignRequest(id, principal.getName() );
    }

    @PostMapping("/serviceRequest/finishRequest")
    public void finishRequest(@RequestBody Long id, Principal principal) {
        serviceRequestService.finishRequest(id);
    }

}
