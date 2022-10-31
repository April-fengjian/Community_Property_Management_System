package com.laioffer.flag.controller;

import com.laioffer.flag.exception.InvalidSearchDateTimeException;
import com.laioffer.flag.model.Room;
import com.laioffer.flag.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
public class SearchController {
    private SearchService searchService;

    @Autowired
    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @GetMapping(value = "/search")
    public List<Room> searchRooms(
            @RequestParam(name = "guest_number") int guestNumber,
            @RequestParam(name = "checkin_date") String start,
            @RequestParam(name = "checkout_date") String end ) {
        LocalDateTime checkinDateTime = LocalDateTime.parse(start, DateTimeFormatter.ofPattern("yyyy-MM-dd-HH:mm:ss"));
        LocalDateTime checkoutDateTime = LocalDateTime.parse(end, DateTimeFormatter.ofPattern("yyyy-MM-dd-HH:mm:ss"));
        if (checkinDateTime.equals(checkoutDateTime) || checkinDateTime.isAfter(checkoutDateTime) || checkinDateTime.isBefore(LocalDateTime.now())) {
            throw new InvalidSearchDateTimeException("Invalid time for search");
        }
        return searchService.search(guestNumber, checkinDateTime, checkoutDateTime);
    }
}