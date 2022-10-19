package com.laioffer.flag.controller;

import com.laioffer.flag.model.Announcement;
import com.laioffer.flag.model.User;
import com.laioffer.flag.service.AnnouncementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
public class AnnouncementController {

    private AnnouncementService announcementService;

    @Autowired
    public AnnouncementController(AnnouncementService announcementService) {
        this.announcementService = announcementService;
    }

    @PostMapping(value = "/announcement/post")
    public void postAnnouncement(@RequestBody Announcement announcement, Principal principal) {
        announcement.setUser(new User.Builder().setUsername(principal.getName()).build());
        LocalDateTime currentLocalDateTime = LocalDateTime.now();
        //DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        announcement.setTime(currentLocalDateTime);
        announcementService.postAnnouncement(announcement);
    }

    @GetMapping(value = "/announcements")
    public List<Announcement> listAnnouncement() {
        return announcementService.listAnnouncements();
    }

    @DeleteMapping(value = "/announcement/{announcementId}")
    public void deleteAnnouncement(@PathVariable Long announcementId) {
        announcementService.deleteAnnouncementById(announcementId);
    }
}
