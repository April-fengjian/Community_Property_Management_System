package com.laioffer.flag.controller;

import com.laioffer.flag.model.Booking;
import com.laioffer.flag.model.Room;
import com.laioffer.flag.service.BookingService;
import com.laioffer.flag.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
public class RoomController {
    private RoomService roomService;
    private BookingService bookingService;

    @Autowired
    public RoomController(RoomService roomService, BookingService bookingService) {
        this.roomService = roomService;
        this.bookingService = bookingService;
    }


    @GetMapping(value = "/rooms")
    public List<Room> listRooms(Principal principal) {
        return roomService.findAll();
    }

    @GetMapping(value = "/rooms/{roomId}")
    public Optional<Room> getRoom(@PathVariable Long roomId) {
        return roomService.findById(roomId);
    }

    @PostMapping("/rooms")
    public void addRoom(
            @RequestParam("name") String name,
            @RequestParam("maxcapacity") int maxCapacity,
//            @RequestParam("imageURL") String imageURL,
            Principal principal) {

        Room room = new Room.Builder()
                .setName(name)
                .setCapacity(maxCapacity)
//                .setImage(imageURL)
//                .setUser(new User.Builder().setUsername(principal.getName()).build())
                .build();
        roomService.add(room);
    }

    @DeleteMapping("/rooms/{roomId}")
    public void deleteRoom(@PathVariable Long roomId) {
        roomService.delete(roomId);
    }
    @GetMapping(value = "/rooms/bookings/{roomId}")
    public List<Booking> listBookings(@PathVariable Long roomId) {
        return bookingService.listByRoom(roomId);
    }

}