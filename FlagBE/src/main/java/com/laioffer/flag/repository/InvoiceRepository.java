package com.laioffer.flag.repository;

import com.laioffer.flag.model.*;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface InvoiceRepository extends  JpaRepository<Invoice, Long> {

    List<Invoice> findByUnit(Unit unit, Sort due_date);

    List<Invoice> findByUnitAndStatus(Unit unit, String status, Sort due_date);

    List<Invoice> findByStatusAndDueDateBefore(String status, LocalDate today,Sort due_date);

//    List<Invoice> findByPaymentDateAfterDueDate(Sort due_date);
//
    @Query(value = "FROM Invoice iv WHERE iv.status = 'paid' AND iv.paymentDate > iv.dueDate")
    List<Invoice> findLate();
    List<Invoice> findByStatus(String status, Sort due_date);

//    Invoice findInvoicesById(Long id);

}