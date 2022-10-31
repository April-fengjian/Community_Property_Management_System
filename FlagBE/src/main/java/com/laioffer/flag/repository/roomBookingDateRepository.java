package com.laioffer.flag.repository;

import com.laioffer.flag.model.RoomReservedDateTime;
import com.laioffer.flag.model.RoomReservedDateTimeKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Repository
public interface RoomBookingDateRepository extends JpaRepository<RoomReservedDateTime, RoomReservedDateTimeKey> {
    @Query(value = "SELECT srd.id.room_id FROM RoomReservedDateTime srd WHERE srd.id.room_id IN ?1 AND srd.id.dateTime BETWEEN ?2 AND ?3 GROUP BY srd.id.room_id")
    Set<Long> findByIdInAndDateTimeBetween(List<Long> stayIds, LocalDateTime startDateTime, LocalDateTime endDateTime);
}

