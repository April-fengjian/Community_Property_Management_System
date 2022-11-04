package com.laioffer.flag.service;

import com.laioffer.flag.exception.ServiceRequestNotExistException;
import com.laioffer.flag.exception.StatusUpdateException;
import com.laioffer.flag.model.ServiceRequest;
import com.laioffer.flag.model.User;
import com.laioffer.flag.repository.ServiceRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

public class ServiceRepositoryService {
    private ServiceRequestRepository serviceRequestRepository;

    @Autowired
    public ServiceRepositoryService(ServiceRequestRepository serviceRequestRepository) {
        this.serviceRequestRepository = serviceRequestRepository;
    }


    public ServiceRequest findByIdAndTenant(Long maintenance_id, String username) throws ServiceRequestNotExistException {
        ServiceRequest stay = serviceRequestRepository.findByIdAndTenant(maintenance_id, new User.Builder().setUsername(username).build());
        if (stay == null) {
            throw new ServiceRequestNotExistException("ServiceRequest doesn't exist");
        }
        return stay;
    }

//    @Transactional(isolation = Isolation.SERIALIZABLE)
//    public void updateStatus(String status, Long stayId, String username) throws ServiceRequestNotExistException, StatusUpdateException {
//        ServiceRequest serviceRequest = serviceRequestRepository.findByIdAndTenant(stayId, new User.Builder().setUsername(username).build());
//        if (serviceRequest == null) {
//            throw new ServiceRequestNotExistException("ServiceRequest doesn't exist");
//        }
//        int numOfLinesChanged = serviceRequestRepository.changeStatus(status, new User.Builder().setUsername(username).build());
//        if (numOfLinesChanged == 0) {
//            throw new StatusUpdateException("No status change");
//        }
//    }

}
