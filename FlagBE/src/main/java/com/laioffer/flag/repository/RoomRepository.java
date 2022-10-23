package com.laioffer.flag.repository;

import com.laioffer.flag.model.Room;
import com.laioffer.flag.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    List<Room> findByUser(User user);

    Room findByIdAndUser(Long id, User host);

    List<Room> findByIdInAndMaxcapacityGreaterThanEqual(List<Long> ids, int maxcapacity);
}