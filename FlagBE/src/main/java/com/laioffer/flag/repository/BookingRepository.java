package com.laioffer.flag.repository;

import com.laioffer.flag.model.Booking;
import com.laioffer.flag.model.Room;
import com.laioffer.flag.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByGuest(User guest);

    List<Booking> findByRoom(Room stay);

    Booking findByIdAndGuest(Long id, User guest); // for deletion

}
