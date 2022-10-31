package com.laioffer.flag.service;

import com.laioffer.flag.model.Room;
import com.laioffer.flag.repository.RoomBookingDateRepository;
import com.laioffer.flag.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class SearchService {
    private RoomRepository roomRepository;
    private RoomBookingDateRepository roomBookingDateRepository;

    @Autowired
    public SearchService(RoomRepository roomRepository, RoomBookingDateRepository roomBookingDateRepository) {
        this.roomRepository = roomRepository;
        this.roomBookingDateRepository = roomBookingDateRepository;
    }
    public List<Room> search(int guestNumber, LocalDateTime checkinDateTime, LocalDateTime checkoutDateTime) {

        List<Long> roomIds = roomRepository.findAllId();
        if (roomIds == null || roomIds.isEmpty()) {
            return new ArrayList<>();
        }

        Set<Long> reservedRoomIds = roomBookingDateRepository.findByIdInAndDateTimeBetween(roomIds, checkinDateTime, checkoutDateTime.minusMinutes(30));

        List<Long> filteredRoomIds = new ArrayList<>();
        for (Long roomId : roomIds) {
            if (!reservedRoomIds.contains(roomId)) {
                filteredRoomIds.add(roomId);
            }
        }
        return roomRepository.findByIdInAndMaxcapacityGreaterThanEqual(filteredRoomIds, guestNumber);
    }

}
