package com.laioffer.flag.service;

import com.laioffer.flag.exception.AnnouncementNotExistException;
import com.laioffer.flag.exception.MessageNotExistException;
import com.laioffer.flag.model.Message;
import com.laioffer.flag.model.User;
import com.laioffer.flag.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class MessageService {
    private MessageRepository messageRepository;

    @Autowired
    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public List<Message> listMessages() {
        return messageRepository.findAll(Sort.by("time").descending());
    }

    public List<Message> listTopMessageBefore(LocalDateTime before) {
        return messageRepository.findFirst10ByTimeBefore(before, Sort.by("time").descending());
    }

    public List<Message> listMessagesByUser(String username) throws MessageNotExistException {
        List<Message> messages= messageRepository.findMessagesByUser(new User.Builder().setUsername(username).build(), Sort.by("time").descending());
        if (messages == null) {
            throw new MessageNotExistException("You don't have active posts");
        }
        return messages;
    }

    public List<Message> listTopMessagesBeforeByUser(LocalDateTime before, String username) throws MessageNotExistException {
        List<Message> messages= messageRepository.findFirst10ByTimeBeforeAndUser(before, new User.Builder().setUsername(username).build(), Sort.by("time").descending());
        if (messages == null) {
            throw new MessageNotExistException("You don't have active posts");
        }
        return messages;
    }
    @Transactional(isolation = Isolation.SERIALIZABLE)
    public void postMessage(Message message) {
        messageRepository.save(message);
    }


    @Transactional(isolation = Isolation.SERIALIZABLE)
    public void deleteMessageByIdAndUser(Long messageId, String username) throws MessageNotExistException {
        Message message = messageRepository.findByIdAndUser(messageId, new User.Builder().setUsername(username).build());
        if (message == null) {
            throw new MessageNotExistException("You message doesn't exist");
        }
        messageRepository.deleteById(messageId);

    }
}
