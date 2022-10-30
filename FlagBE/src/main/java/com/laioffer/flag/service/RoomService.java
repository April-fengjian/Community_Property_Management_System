package com.laioffer.flag.service;

//import com.laioffer.flag.repository.BookingRepository;
//import com.laioffer.flag.repository.RoomBookingDateRepository;
//import com.laioffer.flag.repository.RoomRepository;
import com.laioffer.flag.exception.RoomDeleteException;
import com.laioffer.flag.exception.RoomNotExistException;
import com.laioffer.flag.model.Booking;
import com.laioffer.flag.model.Room;
import com.laioffer.flag.model.User;
import com.laioffer.flag.repository.BookingRepository;
import com.laioffer.flag.repository.RoomBookingDateRepository;
import com.laioffer.flag.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class RoomService {
    private RoomRepository roomRepository;

    private BookingRepository bookingRepository;

    private RoomBookingDateRepository roomBookingDateRepository;

    @Autowired
    public RoomService(RoomRepository roomRepository, BookingRepository bookingRepository, RoomBookingDateRepository roomBookingDateRepository) {
        this.roomRepository = roomRepository;

        this.bookingRepository = bookingRepository;

        this.roomBookingDateRepository = roomBookingDateRepository;
    }



    public List<Room> findAll() {
        return roomRepository.findAll();
    }

    public Optional<Room> findById(Long roomId) throws RoomNotExistException {
        Optional<Room> room = roomRepository.findById(roomId);
        if (room == null) {
            throw new RoomNotExistException("Room doesn't exist");
        }
        return room;
    }


    @Transactional(isolation = Isolation.SERIALIZABLE)
    public void add(Room room) {
        roomRepository.save(room);
    }

    @Transactional(isolation = Isolation.SERIALIZABLE)
    public void delete(Long roomId) throws RoomNotExistException, RoomDeleteException {
        Optional<Room> room = roomRepository.findById(roomId);
        if (room == null) {
            throw new RoomNotExistException("Room doesn't exist");
        }
        List<Booking> bookings = bookingRepository.findByRoomAndCheckoutDateTimeAfter(room, LocalDateTime.now());
        if (bookings != null && bookings.size() > 0) {
            throw new RoomDeleteException("Cannot delete room with active booking");
        }
        roomRepository.deleteById(roomId);
    }
}