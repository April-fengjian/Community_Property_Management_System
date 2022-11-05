package com.laioffer.flag.repository;

import com.laioffer.flag.model.ServiceRequest;
import com.laioffer.flag.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Sort;

import java.util.List;
@Repository
public interface ServiceRequestRepository extends JpaRepository<ServiceRequest, Long> {
    List<ServiceRequest> findByTenant(User tenant, Sort sort);
    List<ServiceRequest> findByProvider(User provider, Sort sort);
    List<ServiceRequest> findServiceRequestsByStatusAndTenant(String status, User tenant, Sort sort);

    List<ServiceRequest> findServiceRequestsByStatus(String status, Sort sort);
    ServiceRequest findByIdAndTenant(Long id, User tenant);

    @Modifying(clearAutomatically = true)
    @Query("update ServiceRequest sr set sr.status = :newStatus where sr.tenant = :tenant")
    int changeStatus(@Param("newStatus") String newStatus, @Param("tenant") User tenant);
}
