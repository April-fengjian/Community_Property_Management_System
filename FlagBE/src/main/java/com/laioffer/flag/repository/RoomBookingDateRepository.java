package com.laioffer.flag.repository;

import com.laioffer.flag.model.RoomReservedDate;
import com.laioffer.flag.model.RoomReservedDateKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Repository
public interface RoomBookingDateRepository extends JpaRepository<RoomReservedDate, RoomReservedDateKey> {
    @Query(value = "SELECT srd.id.room_id FROM RoomReservedDate srd WHERE srd.id.room_id IN ?1 AND srd.id.date BETWEEN ?2 AND ?3 GROUP BY srd.id.room_id")
    Set<Long> findByIdInAndDateBetween(List<Long> stayIds, LocalDate startDate, LocalDate endDate);
}

