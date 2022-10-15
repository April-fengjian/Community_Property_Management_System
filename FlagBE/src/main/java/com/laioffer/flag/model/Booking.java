package com.laioffer.flag.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Table(name = "booking")
@JsonDeserialize(builder = Booking.Builder.class)
public class Booking implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @JsonProperty("checkin_date")
    private LocalDate checkinDate;

    @JsonProperty("checkout_date")
    private LocalDate checkoutDate;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User guest;

    @OneToOne
    @JoinColumn(name = "room_id")
    private Room room;

    public Booking() {}

    private Booking(Builder builder) {
        this.id = builder.id;
        this.checkinDate = builder.checkinDate;
        this.checkoutDate = builder.checkoutDate;
        this.guest = builder.guest;
        this.room = builder.room;
    }

    public Integer getId() {
        return id;
    }

    public LocalDate getCheckinDate() {
        return checkinDate;
    }

    public LocalDate getCheckoutDate() {
        return checkoutDate;
    }

    public User getGuest() {
        return guest;
    }

    public Booking setGuest(User guest) {
        this.guest = guest;
        return this;
    }

    public Room getRoom() {
        return room;
    }

    public static class Builder {
        @JsonProperty("id")
        private Integer id;

        @JsonProperty("checkin_date")
        private LocalDate checkinDate;

        @JsonProperty("checkout_date")
        private LocalDate checkoutDate;

        @JsonProperty("guest")
        private User guest;

        @JsonProperty("room")
        private Room room;

        public Builder setId(Integer id) {
            this.id = id;
            return this;
        }

        public Builder setCheckinDate(LocalDate checkinDate) {
            this.checkinDate = checkinDate;
            return this;
        }

        public Builder setCheckoutDate(LocalDate checkoutDate) {
            this.checkoutDate = checkoutDate;
            return this;
        }

        public Builder setGuest(User guest) {
            this.guest = guest;
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
