package com.laioffer.flag.controller;


import com.laioffer.flag.model.Message;
import com.laioffer.flag.model.User;
import com.laioffer.flag.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
public class MessageController {

    private MessageService messageService;

    @Autowired
    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping(value = "/message/post")
    public void postMessage(@RequestBody Message message, Principal principal) {
        message.setUser(new User.Builder().setUsername(principal.getName()).build());
        LocalDateTime currentLocalDateTime = LocalDateTime.now();
        //DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        message.setTime(currentLocalDateTime);
        messageService.postMessage(message);
    }

    @GetMapping(value = "/messages")
    public List<Message> listMessage() {
        return messageService.listMessages();
    }

    @GetMapping(value = "/messages/top")
    public List<Message> listTopMessageBeforeTime(
            @RequestParam(name = "time") String time) {
        LocalDateTime beforeTime = LocalDateTime.parse(time);
        return messageService.listTopMessageBefore(beforeTime);
    }

//    @GetMapping(value = "/myMessages")
//    public List<Message> listMessageByUser(Principal principal) {
//        return messageService.listMessagesByUser(principal.getName());
//    }
    @GetMapping(value = "/myMessages/top")
    public List<Message> listTopMessageBeforeTimeByUser(Principal principal,
            @RequestParam(name = "time") String time) {
        LocalDateTime beforeTime = LocalDateTime.parse(time);
        return messageService.listTopMessagesBeforeByUser(beforeTime, principal.getName());
    }

    @DeleteMapping(value = "/message/{messageId}")
    public void deleteMessage(@PathVariable Long messageId, Principal principal) {
        messageService.deleteMessageByIdAndUser(messageId, principal.getName());
    }

}
