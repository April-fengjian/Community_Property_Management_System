package com.laioffer.flag.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.io.Serializable;

import java.time.LocalDateTime;

@Entity
@Table(name="announcement")
@JsonDeserialize(builder = Announcement.Builder.class) // tell Jackson
public class Announcement implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String title;

    private LocalDateTime time;

    private String description;

    private String importance;

    @ManyToOne
    @JoinColumn(name = "user")
    private User user; // who's the owner of the stay

    public Announcement() {}

    private Announcement(Builder builder){
        this.id = builder.id;
        this.title = builder.title;
        this.time = builder.time;
        this.description = builder.description;
        this.user = builder.user;
        this.importance = builder.importance;;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public String getDescription() {
        return description;
    }

    public User getUser() {
        return user;
    }

    public String getImportance() {
        return importance;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public static class Builder {
        @JsonProperty("id")
        private Long id;

        @JsonProperty("title")
        private String title;

        @JsonProperty("time")
        private LocalDateTime time;
        @JsonProperty("description")
        private String description;
        @JsonProperty("user")
        private User user;

        @JsonProperty("importance")
        private String importance;


        public Builder setId(Long id){
            this.id = id;
            return this;
        }

        public Builder setTitle(String title){
            this.title = title;
            return this;
        }

        public Builder setDescription(String description) {
            this.description = description;
            return this;
        }

        public Builder setTime(LocalDateTime time){
            this.time = time;
            return this;
        }

        public Builder setUser(User user){
            this.user = user;
            return this;
        }

        public Builder setImportance(String importance){
            this.importance = importance;
            return this;
        }

        public Announcement build(){return new Announcement(this);}
    }
}
