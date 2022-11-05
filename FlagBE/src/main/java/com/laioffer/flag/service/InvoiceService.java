package com.laioffer.flag.service;

import com.laioffer.flag.exception.InvoiceNotExistException;
import com.laioffer.flag.model.*;
import com.laioffer.flag.repository.InvoiceRepository;
import com.laioffer.flag.repository.UnitRepository;
import com.laioffer.flag.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class InvoiceService {
    private InvoiceRepository invoiceRepository;
    private UserRepository userRepository;

    @Autowired
    public InvoiceService(InvoiceRepository invoiceRepository, UserRepository userRepository) {

        this.invoiceRepository = invoiceRepository;
        this.userRepository = userRepository;
    }

    public List<Invoice> listInvoiceByUser(String username) {
        User user = userRepository.findById(username).orElse(null);
        Unit unit = user.getUnit();
        //Unit unit = new User.Builder().setUsername(username).build().getUnit();  错误这样 get的unit 永远为null
        return invoiceRepository.findByUnit(unit, Sort.by("dueDate").descending());
    }

    public List<Invoice> listInvoiceByUserAndStatus(String username, String status) {
        User user = userRepository.findById(username).orElse(null);
        Unit unit = user.getUnit();
        return invoiceRepository.findByUnitAndStatus(unit, status, Sort.by("dueDate").descending());
    }

    public List<Invoice> listInvoiceByStatus(String status) {
        return invoiceRepository.findByStatus(status, Sort.by("dueDate").ascending());
    }
//    public List<Invoice> listInvoiceByOverdue() {
//        return invoiceRepository.findByStatus(status, Sort.by("dueDate").ascending());
//    }

    @Transactional(isolation = Isolation.SERIALIZABLE)
    public void postInvoice(Invoice invoice) {
        invoiceRepository.save(invoice);
    }

    @Transactional(isolation = Isolation.SERIALIZABLE)
    public void updateInvoiceStatus(Long id, String status) throws InvoiceNotExistException {
        Invoice invoice = invoiceRepository.findById(id).orElse(null);
        if (invoice == null) {
            throw new InvoiceNotExistException("Invoice doesn't exist");
        } else {
            LocalDate currentLocalDate = LocalDate.now();
            invoice.setInvoiceDate(currentLocalDate);
            invoice.setStatus(status);
            invoiceRepository.save(invoice);
        }
    }
}
