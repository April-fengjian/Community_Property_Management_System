package com.laioffer.flag.controller;

import com.laioffer.flag.model.ServiceRequest;
import com.laioffer.flag.model.User;
import com.laioffer.flag.service.ServiceRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.sql.Date;

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
        serviceRequest.setHost(new User.Builder().setUsername(principal.getName()).build());
        serviceRequestService.addRequest(serviceRequest);
    }

}
