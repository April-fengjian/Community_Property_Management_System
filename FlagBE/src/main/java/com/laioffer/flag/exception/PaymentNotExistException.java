package com.laioffer.flag.exception;

public class PaymentNotExistException extends RuntimeException{
    public PaymentNotExistException(String message) {
        super(message);
    }
}

