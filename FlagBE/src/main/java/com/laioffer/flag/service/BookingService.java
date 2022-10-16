package com.laioffer.flag.service;

import com.laioffer.flag.exception.BookingCollisionException;
import com.laioffer.flag.exception.BookingNotFoundException;
import com.laioffer.flag.model.Booking;
import com.laioffer.flag.model.Room;
import com.laioffer.flag.model.User;
import com.laioffer.flag.repository.BookingRepository;
//import com.laioffer.flag.repository.roomBookingDateRepository;
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
//    private com.laioffer.flag.repository.BookingRepository BookingRepository;
//
//
//    @Autowired
//    public BookingService(BookingRepository BookingRepository) {
//        this.BookingRepository = BookingRepository;
//    }
//
//    public List<Booking> listByGuest(String username) {
//        return BookingRepository.findByGuest(new User.Builder().setUsername(username).build());
//    }
//
//    public List<Booking> listByRoom(Integer roomId) {
//        return BookingRepository.findByRoom(new Room.Builder().setId(roomId).build());
//    }

//    @Transactional(isolation = Isolation.SERIALIZABLE)
//    public void add(Booking Booking) throws BookingCollisionException {
//        Set<Long> roomIds = roomBookingDateRepository.findByIdInAndDateBetween(Arrays.asList(Long.valueOf(Booking.getRoom().getId())), Booking.getCheckinDate(), Booking.getCheckoutDate().minusDays(1));
//        if (!roomIds.isEmpty()) {
//            throw new BookingCollisionException("Duplicate Booking");
//        }
//
////        List<StayReservedDate> reservedDates = new ArrayList<>();
////        for (LocalDate date = Booking.getCheckinDate(); date.isBefore(Booking.getCheckoutDate()); date = date.plusDays(1)) {
////            reservedDates.add(new StayReservedDate(new StayReservedDateKey(Booking.getStay().getId(), date), Booking.getStay()));
////        }
////        roomBookingDateRepository.saveAll(reservedDates);
//        BookingRepository.save(Booking);
//    }
//
//    @Transactional(isolation = Isolation.SERIALIZABLE)
//    public void delete(Long BookingId, String username) {
//        Booking Booking = BookingRepository.findByIdAndGuest(BookingId, new User.Builder().setUsername(username).build());
//        if (Booking == null) {
//            throw new BookingNotFoundException("Booking is not available");
//        }
//        for (LocalDate date = Booking.getCheckinDate(); date.isBefore(Booking.getCheckoutDate()); date = date.plusDays(1)) {
//            roomBookingDateRepository.deleteById(new RoomBookingDateKey(Booking.getRoom().getId(), date));
//        }
//        BookingRepository.deleteById(BookingId);
//    }

}
