package com.laioffer.flag.repository;

import com.laioffer.flag.model.Booking;
import com.laioffer.flag.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

//public interface roomBookingDateRepository extends JpaRepository<Booking, Room> {
//   // @Query(value = "SELECT bk.id.room_id FROM Booking bk WHERE srd.id.stay_id IN ?1 AND srd.id.date BETWEEN ?2 AND ?3 GROUP BY srd.id.stay_id")
//    Set<Long> findByIdInAndDateBetween(List<Long> roomIds, LocalDate startDate, LocalDate endDate);
//}

