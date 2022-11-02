package com.laioffer.flag.controller;

import com.laioffer.flag.exception.InvalidBookingDateException;
import com.laioffer.flag.model.Booking;
import com.laioffer.flag.model.User;
import com.laioffer.flag.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;

@RestController
public class BookingController {
    private BookingService bookingService;

    @Autowired
    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping(value = "/bookings/user")
    public List<Booking> listBookingsByUser(Principal principal) {
        return bookingService.listByUser(principal.getName());
    }
    @GetMapping(value = "/bookings")
    public List<Booking> listBookings(Principal principal) {
        return bookingService.listAll();
    }

    @PostMapping("/bookings")
    public void addBooking(@RequestBody Booking booking, Principal principal) {
        LocalDateTime checkinDate = booking.getCheckinDateTime();
        LocalDateTime checkoutDate = booking.getCheckoutDateTime();
        if (checkinDate.equals(checkoutDate) || checkinDate.isAfter(checkoutDate) || checkinDate.isBefore(LocalDateTime.now())) {
            throw new InvalidBookingDateException("Invalid date for booking");
        }
        booking.setGuest(new User.Builder().setUsername(principal.getName()).build());
        bookingService.add(booking);
    }

    @DeleteMapping("/bookings/{bookingId}")
    public void deleteBooking(@PathVariable Long bookingId, Principal principal) {
        bookingService.delete(bookingId, principal.getName());
    }
}