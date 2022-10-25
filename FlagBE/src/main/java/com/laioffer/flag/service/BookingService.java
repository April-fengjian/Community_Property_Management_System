package com.laioffer.flag.service;

import com.laioffer.flag.exception.BookingCollisionException;
import com.laioffer.flag.exception.BookingNotFoundException;
import com.laioffer.flag.model.*;
//import com.laioffer.flag.repository.BookingRepository;
//import com.laioffer.flag.repository.RoomBookingDateRepository;
import com.laioffer.flag.repository.BookingRepository;
import com.laioffer.flag.repository.RoomBookingDateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

@Service
public class BookingService {
    private BookingRepository bookingRepository;
    private RoomBookingDateRepository roomBookingDateRepository;

    @Autowired
    public BookingService(BookingRepository bookingRepository, RoomBookingDateRepository roomBookingDateRepository) {
        this.bookingRepository = bookingRepository;
        this.roomBookingDateRepository = roomBookingDateRepository;
    }

    public List<Booking> listByUser(String username) {
        return bookingRepository.findByUser(new User.Builder().setUsername(username).build());
    }

    public List<Booking> listByRoom(Long roomId) {
        return bookingRepository.findByRoom(new Room.Builder().setId(roomId).build());
    }

    @Transactional(isolation = Isolation.SERIALIZABLE)
    public void add(Booking booking) throws BookingCollisionException {
        Set<Long> roomIds = roomBookingDateRepository.findByIdInAndDateBetween(Arrays.asList(booking.getRoom().getId()), booking.getCheckinDate(), booking.getCheckoutDate().minusDays(1));
        if (!roomIds.isEmpty()) {
            throw new BookingCollisionException("Duplicate booking");
        }

        List<RoomReservedDate> reservedDates = new ArrayList<>();
        for (LocalDate date = booking.getCheckinDate(); date.isBefore(booking.getCheckoutDate()); date = date.plusDays(1)) {
            reservedDates.add(new RoomReservedDate(new RoomReservedDateKey(booking.getRoom().getId(), date), booking.getRoom()));
        }
        roomBookingDateRepository.saveAll(reservedDates);
        bookingRepository.save(booking);
    }

    @Transactional(isolation = Isolation.SERIALIZABLE)
    public void delete(Long bookingId, String username) {
        Booking booking = bookingRepository.findByIdAndUser(bookingId, new User.Builder().setUsername(username).build());
        if (booking == null) {
            throw new BookingNotFoundException("Booking is not available");
        }
        for (LocalDate date = booking.getCheckinDate(); date.isBefore(booking.getCheckoutDate()); date = date.plusDays(1)) {
            roomBookingDateRepository.deleteById(new RoomReservedDateKey(booking.getRoom().getId(), date));
        }
        bookingRepository.deleteById(bookingId);
    }
}