package com.laioffer.flag.repository;

import com.laioffer.flag.model.Booking;
import com.laioffer.flag.model.Room;
import com.laioffer.flag.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUser(User user);

    List<Booking> findByRoom(Room room);

    Booking findByIdAndUser(Long id, User user); // for deletion

    List<Booking> findByRoomAndCheckoutDateTimeAfter(Optional<Room> room, LocalDateTime dateTime);


}
