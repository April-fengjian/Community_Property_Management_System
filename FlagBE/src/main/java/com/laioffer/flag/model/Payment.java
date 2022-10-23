package com.laioffer.flag.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "payment")
@JsonDeserialize(builder = Payment.Builder.class)
public class Payment implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)

    private Long id;
    private String term;
    private String description;

    private Integer amount;

    private String status;

    private Date due_date;

    private LocalDate payment_date;


    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;


    public Payment() {}

    private Payment(Payment.Builder builder) {
        this.id = builder.id;
        this.term = builder.term;
        this.description = builder.description;
        this.amount = builder.amount;
        this.status = builder.status;
        this.due_date = builder.due_date;
        this.payment_date = builder.payment_date;
        this.user = builder.user;
        this.room = builder.room;
    }

    public LocalDate getTime() {
        return payment_date;
    }

    public void setTime(LocalDate payment_date) {
        this.payment_date = payment_date;
    }

    public Long getPayment_id() {
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
    public Date getDue_date() { return due_date; }

    public User getUser() {
        return user;
    }
    public Room getRoom() { return room; }

    public void setPayment_date_id(Long payment_id) {
        this.id = id;
    }

    public void setTerm(String term) {
        this.term = term;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setAmount(Integer amount) { this.amount = amount; }

    public void setStatus(String status) { this.status = status; }
    public void setDue_date(Date due_date) {this.due_date = due_date; }

    public void setUser(User user) {
        this.user = user;
    }

    public void setRoom(Room room) {this.room = room; }

    public static class Builder {
        @JsonProperty("payment_id")
        private Long id;

        @JsonProperty("term")
        private String term;

        @JsonProperty("payment_date")
        private LocalDate payment_date;

        @JsonProperty("status")
        private String status;
        @JsonProperty("amount")
        private Integer amount;

        @JsonProperty("description")
        private String description;
        @JsonProperty("due_date")
        private Date due_date;

        @JsonProperty("user")
        private User user;
        @JsonProperty("room")
        private Room room;


        public Payment.Builder setId(Long id) {
            this.id = id;
            return this;
        }

        public Payment.Builder setTerm(String term) {
            this.term = term;
            return this;
        }
        public Payment.Builder setPayment_date(LocalDate payment_date) {
            this.payment_date = payment_date;
            return this;
        }

        public Payment.Builder setStatus(String status) {
            this.status = status;
            return this;
        }

        public Payment.Builder setDescription(String description) {
            this.description = description;
            return this;
        }

        public Payment.Builder setDue_date(Date due_date) {
            this.due_date = due_date;
            return this;
        }
        public Payment.Builder setUser(User user) {
            this.user = user;
            return this;
        }

        public Payment.Builder setRoom(Room room) {
            this.room = room;
            return this;
        }
        public Payment build() {
            return new Payment(this);
        }
    }


}
