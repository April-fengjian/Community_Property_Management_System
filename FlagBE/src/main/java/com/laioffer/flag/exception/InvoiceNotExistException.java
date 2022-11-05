package com.laioffer.flag.exception;

public class InvoiceNotExistException extends RuntimeException{
    public InvoiceNotExistException(String message) {
        super(message);
    }
}
