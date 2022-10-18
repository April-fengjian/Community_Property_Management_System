package com.laioffer.flag.repository;

import com.laioffer.flag.model.Announcement;
import com.laioffer.flag.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnnouncementRepository extends JpaRepository {
    List<Announcement> findByUser(User user);
    Announcement findById(Long id);
    Announcement findByIdAndUser(Long id, User user);
}
