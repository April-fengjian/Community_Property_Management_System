package com.laioffer.flag.controller;

import com.laioffer.flag.model.Invoice;
import com.laioffer.flag.model.Unit;
import com.laioffer.flag.model.User;
import com.laioffer.flag.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.util.List;

@RestController
public class InvoiceController {
    InvoiceService invoiceService;
    @Autowired
    public InvoiceController(InvoiceService invoiceService) {
        this.invoiceService = invoiceService;
    }

//    @PostMapping("/invoice/create")             //create regular bil
//    public void postInvoice(@RequestBody Invoice invoice) {
//        invoice.setStatus("unpaid");
//        invoice.setInvoiceDate(LocalDate.now());
//        invoiceService.postInvoice(invoice);
//    }
    @PostMapping("/invoice/create")
    public void postInvoice(@RequestParam("id") Long id) {
        invoiceService.billLateFee(id);
    }
    @GetMapping("/invoice/myList/all")
    public List<Invoice> listMyInvoice(Principal principal) {
        return invoiceService.listInvoiceByUser(principal.getName());
    }
    @GetMapping("/invoice/myList")
    public List<Invoice> listMyInvoiceAndStatus(@RequestParam("status") String status, Principal principal) {
        return invoiceService.listInvoiceByUserAndStatus(principal.getName(), status);
    }
    @GetMapping("/invoice/list")
    public List<Invoice> listInvoiceByStatus(@RequestParam("status") String status) {
        return invoiceService.listInvoiceByStatus(status);
    }

    @PostMapping("/invoice/myPayment")
    public void payInvoice(@RequestParam Long id) {
        invoiceService.updateInvoiceStatus(id, "paid");
    }
}

