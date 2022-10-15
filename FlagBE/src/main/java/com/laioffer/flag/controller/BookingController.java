package com.laioffer.flag.controller;

import com.laioffer.flag.model.Booking;
import com.laioffer.flag.model.User;
import com.laioffer.flag.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.util.List;

public class BookingController {
    private BookingService bookingService;

    @Autowired
    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

//    @GetMapping(value = "/bookings")
//    public List<Booking> listReservations(Principal principal) {
//        return BookingService.listByGuest(principal.getName());
//    }
//
//    @PostMapping("/reservations")
//    public void addReservation(@RequestBody Reservation reservation, Principal principal) {
//        LocalDate checkinDate = reservation.getCheckinDate();
//        LocalDate checkoutDate = reservation.getCheckoutDate();
//        if (checkinDate.equals(checkoutDate) || checkinDate.isAfter(checkoutDate) || checkinDate.isBefore(LocalDate.now())) {
//            throw new InvalidReservationDateException("Invalid date for reservation");
//        }
//        reservation.setGuest(new User.Builder().setUsername(principal.getName()).build());
//        reservationService.add(reservation);
//    }
//
//    @DeleteMapping("/reservations/{reservationId}")
//    public void deleteReservation(@PathVariable Long reservationId, Principal principal) {
//        bookingService.delete(reservationId, principal.getName());
//    }
}
