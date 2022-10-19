package com.laioffer.flag.repository;

import com.laioffer.flag.model.Message;
import com.laioffer.flag.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
//    List<Message> findByUser(User user);
//
//    Message findByMessage_id(Long id);
//    Message findByMessage_idAndUser(Long id);
}
