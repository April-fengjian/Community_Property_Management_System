package com.laioffer.flag.repository;

import com.laioffer.flag.model.Room;
import com.laioffer.flag.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
//    List<Room> findByUser(User user);

//    Room findByIdAndUser(Long id, User host);

    Optional<Room> findById(Long id);

    @Override
    List<Room> findAll();
    @Query("select id FROM Room")
    List<Long> findAllId();

    List<Room> findByIdInAndMaxcapacityGreaterThanEqual(List<Long> ids, int maxcapacity);
}