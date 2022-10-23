package com.laioffer.flag.repository;

import com.laioffer.flag.model.Room;
import com.laioffer.flag.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.List;
import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    //List<Room> findByUser(User user);

//    Room findByIdAndUser(Long id, User host);

    Optional<Room> findById(Long id);

    List<Room> findByIdInAndMaxcapacityGreaterThanEqual(List<Long> ids, int maxcapacity);
}