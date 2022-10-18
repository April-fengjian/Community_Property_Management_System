package com.laioffer.flag.controller;

import com.laioffer.flag.exception.InvalidBookingDateException;
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
//    @PostMapping("/bookings")
//    public void addReservation(@RequestBody Booking booking, Principal principal) {
//        LocalDate checkinDate = booking.getCheckinDate();
//        LocalDate checkoutDate = booking.getCheckoutDate();
//        if (checkinDate.equals(checkoutDate) || checkinDate.isAfter(checkoutDate) || checkinDate.isBefore(LocalDate.now())) {
//            throw new InvalidBookingDateException("Invalid date for reservation");
//        }
//        booking.setGuest(new User.Builder().setUsername(principal.getName()).build());
//        bookingService.add(booking);
//    }
//
//    @DeleteMapping("/bookings/{bookingId}")
//    public void deleteBooking(@PathVariable Long bookingId, Principal principal) {
//        bookingService.delete(bookingId, principal.getName());
//    }
}
