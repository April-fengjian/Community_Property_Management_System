package com.laioffer.flag.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.annotation.Generated;
import javax.persistence.*;
import java.io.Serializable;

import java.time.LocalDate;

@Entity
@Table(name="announcement")
@JsonDeserialize(builder = Announcement.Builder.class) // tell Jackson
public class Announcement implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long announcementId;

    private String title;

    private LocalDate date;

    private String description;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user; // who's the owner of the stay

    public Announcement() {}

    private Announcement(Builder builder){
        this.announcementId = builder.announcementId;
        this.title = builder.title;
        this.date = builder.date;
        this.description = builder.description;
    }

    public Long getAnnouncementId(){return announcementId;}
    public String getTitle(){return title;}
    public String getDescription(){return description;}
    public LocalDate getDate(){return date;}
    public User getUser(){return user;}

    public static class Builder {
        @JsonProperty("id")
        private Long announcementId;

        @JsonProperty("title")
        private String title;

        @JsonProperty("date")
        private LocalDate date;
        @JsonProperty("description")
        private String description;
        @JsonProperty("user")
        private User user;
    }


}
