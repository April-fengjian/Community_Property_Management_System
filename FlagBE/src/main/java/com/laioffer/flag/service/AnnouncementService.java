package com.laioffer.flag.service;

import com.laioffer.flag.exception.AnnouncementNotExistException;
import com.laioffer.flag.model.Announcement;
import com.laioffer.flag.repository.AnnouncementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AnnouncementService {

    private AnnouncementRepository announcementRepository;

    @Autowired
    public AnnouncementService(AnnouncementRepository announcementRepository) {
        this.announcementRepository = announcementRepository;
    }

    public List<Announcement> listAnnouncements() {
        return announcementRepository.findAll(Sort.by("time").descending());
//        dao.findAll(new Sort(Sort.Direction.DESC, "colName"));
//// or
//        dao.findAll(Sort.by("colName").descending());
    }

    @Transactional(isolation = Isolation.SERIALIZABLE)
    public void postAnnouncement(Announcement announcement) {
        announcementRepository.save(announcement);
    }


    @Transactional(isolation = Isolation.SERIALIZABLE)
    public void deleteAnnouncementById(Long announcementId) throws AnnouncementNotExistException {
        Announcement announcement = announcementRepository.findById(announcementId).orElse(null);
        if (announcement == null) {
            throw new AnnouncementNotExistException("Announcement doesn't exist");
        }
        announcementRepository.deleteById(announcementId);
    }
}
