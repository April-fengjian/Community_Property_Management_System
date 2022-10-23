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
import java.util.List;

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



    public List<Room> listByUser(String username) {
        return roomRepository.findByUser(new User.Builder().setUsername(username).build());
    }

    public Room findByIdAndUser(Long roomId, String username) throws RoomNotExistException {
        Room room = roomRepository.findByIdAndUser(roomId, new User.Builder().setUsername(username).build());
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
    public void delete(Long roomId, String username) throws RoomNotExistException, RoomDeleteException {
        Room room = roomRepository.findByIdAndUser(roomId, new User.Builder().setUsername(username).build());
        if (room == null) {
            throw new RoomNotExistException("Room doesn't exist");
        }
        List<Booking> bookings = bookingRepository.findByRoomAndCheckoutDateAfter(room, LocalDate.now());
        if (bookings != null && bookings.size() > 0) {
            throw new RoomDeleteException("Cannot delete room with active booking");
        }
        roomRepository.deleteById(roomId);
    }
}