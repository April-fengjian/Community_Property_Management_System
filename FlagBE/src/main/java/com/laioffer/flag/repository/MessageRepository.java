package com.laioffer.flag.repository;

import com.laioffer.flag.model.Message;
import com.laioffer.flag.model.User;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findMessagesByUser(User user, Sort time);
    Message findByIdAndUser(Long id, User user);
    List<Message> findFirst10ByTimeBefore(LocalDateTime before, Sort sort);

    List<Message> findFirst10ByTimeBeforeAndUser(LocalDateTime before, User user, Sort sort);

}
