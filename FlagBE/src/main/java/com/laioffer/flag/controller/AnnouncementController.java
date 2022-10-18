package com.laioffer.flag.controller;

import com.laioffer.flag.model.Announcement;
import com.laioffer.flag.service.AnnouncementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
public class AnnouncementController {

    private AnnouncementService announcementService;

    @Autowired
    public AnnouncementController(AnnouncementService announcementService) {
        this.announcementService = announcementService;
    }

    @GetMapping(value = "/announcement/getAll")
    public List<Announcement> listAnnouncement() {
        return announcementService.listAnnouncements();
    }

//    @DeleteMapping("/announcement/{announcementId}")
//    public void deleteStay(@PathVariable Long announcementId, Principal principal) {
//        stayService.delete(stayId, principal.getName());
//    }
}
