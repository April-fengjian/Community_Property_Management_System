package com.laioffer.flag.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Table(name = "invoice")
@JsonDeserialize(builder = com.laioffer.flag.model.Invoice.Builder.class)
public class Invoice implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String term;
    private String description;

    private Integer amount;

    private String status;

    private LocalDate invoiceDate;
    private LocalDate dueDate;

    private LocalDate paymentDate;
    @JsonProperty("lateBillId")
    private Long lateBillId;

    @ManyToOne
    @JoinColumn(name = "unit")
    private Unit unit;


    public Invoice() {}

    private Invoice(Builder builder) {
        this.id = builder.id;
        this.term = builder.term;
        this.description = builder.description;
        this.amount = builder.amount;
        this.status = builder.status;
        this.invoiceDate = builder.invoiceDate;
        this.dueDate = builder.dueDate;
        this.paymentDate = builder.paymentDate;
        this.unit = builder.unit;
        this.lateBillId = builder.lateBillId;
    }

    public LocalDate getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(LocalDate paymentDate) {
        this.paymentDate = paymentDate;
    }

    public Long getId() {
        return id;
    }
    public String getTerm() {
        return term;
    }
    public String getDescription() {
        return description;
    }
    public Integer getAmount() { return amount; }
    public String getStatus() { return status; }
    public LocalDate getDueDate() { return dueDate; }
    public Unit getUnit() { return unit; }

    public void setTerm(String term) {
        this.term = term;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setAmount(Integer amount) { this.amount = amount; }

    public void setStatus(String status) { this.status = status; }
    public void setDueDate(LocalDate duDate) {this.dueDate = duDate; }
    public void setInvoiceDate(LocalDate invoiceDate) {this.invoiceDate = invoiceDate; }
    public void setUnit(Unit unit) {this.unit = unit; }

    public void setLateBillId(Long lateBillId) {  this.lateBillId = lateBillId; }

    public static class Builder {
        @JsonProperty("invoice_id")
        private Long id;

        @JsonProperty("term")
        private String term;

        @JsonProperty("invoice_date")
        private LocalDate invoiceDate;
        @JsonProperty("payment_date")
        private LocalDate paymentDate;

        @JsonProperty("status")
        private String status;
        @JsonProperty("amount")
        private Integer amount;

        @JsonProperty("description")
        private String description;

        @JsonProperty("due_date")
        private LocalDate dueDate;

        @JsonProperty("unit")
        private Unit unit;

        @JsonProperty("late_bill_id")
        private Long lateBillId;


        public Builder setId(Long id) {
            this.id = id;
            return this;
        }

        public Builder setTerm(String term) {
            this.term = term;
            return this;
        }

        public Builder setInvoiceDate(LocalDate invoiceDate) {
            this.invoiceDate = invoiceDate;
            return this;
        }
        public Builder setPaymentDate(LocalDate paymentDate) {
            this.paymentDate = paymentDate;
            return this;
        }

        public Builder setStatus(String status) {
            this.status = status;
            return this;
        }

        public Builder setDescription(String description) {
            this.description = description;
            return this;
        }

        public Builder setDueDate(LocalDate duDate) {
            this.dueDate = duDate;
            return this;
        }

        public Builder setUnit(Unit unit) {
            this.unit = unit;
            return this;
        }

        public Builder setLateBillId(Long lateBillId) {
            this.lateBillId = lateBillId;
            return this;
        }

        public Invoice build() {
            return new Invoice(this);
        }
    }


}

