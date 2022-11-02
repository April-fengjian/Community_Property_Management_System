package com.laioffer.flag.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.LocalDateTime;

@Entity
@Table(name = "booking")
@JsonDeserialize(builder = Booking.Builder.class)
public class Booking implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String title;
    @JsonProperty("checkin_date_time")
    private LocalDateTime checkinDateTime;

    @JsonProperty("checkout_date_time")
    private LocalDateTime checkoutDateTime;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

    public Booking() {}

    private Booking(Builder builder) {
        this.id = builder.id;
        this.checkinDateTime = builder.checkinDateTime;
        this.checkoutDateTime = builder.checkoutDateTime;
        this.user = builder.user;
        this.room = builder.room;
        this.title = builder.title;
    }

    public Long getId() {
        return id;
    }

    public LocalDateTime getCheckinDateTime() {
        return checkinDateTime;
    }

    public LocalDateTime getCheckoutDateTime() {
        return checkoutDateTime;
    }

    public User getGuest() {
        return user;
    }

    public String getTitle() {return title; }

    public Booking setGuest(User user) {
        this.user = user;
        return this;
    }

    public Room getRoom() {
        return room;
    }

    public static class Builder {
        @JsonProperty("id")
        private Long id;

        @JsonProperty("checkin_date_time")
        private LocalDateTime checkinDateTime;

        @JsonProperty("checkout_date_time")
        private LocalDateTime checkoutDateTime;

        @JsonProperty("user")
        private User user;

        @JsonProperty("room")
        private Room room;
        @JsonProperty("title")
        private String title;

        public Builder setId(Long id) {
            this.id = id;
            return this;
        }

        public Builder setCheckinDate(LocalDateTime checkinDateTime) {
            this.checkinDateTime = checkinDateTime;
            return this;
        }

        public Builder setCheckoutDate(LocalDateTime checkoutDateTime) {
            this.checkoutDateTime = checkoutDateTime;
            return this;
        }

        public Builder setGuest(User user) {
            this.user = user;
            return this;
        }

        public Builder setRoom(Room room) {
            this.room = room;
            return this;
        }

        public Booking build() {
            return new Booking(this);
        }
    }
}
