package com.laioffer.flag.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Date;
import java.time.LocalDateTime;


@Entity
@Table(name = "comment")
@JsonDeserialize(builder = Comment.Builder.class)
public class Comment implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user")
    private User user;
    private String description;
    private LocalDateTime time;
    @ManyToOne
    @JoinColumn(name = "message_id")
    @JsonIgnore
    private Message message;

    public Comment() {}

    public Comment(Builder builder) {
        this.id = builder.id;
        this.description = builder.description;
        this.time = builder.time;
        this.message = builder.message;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUser(User user) { this.user = user;}

    public void setDescription(String description) {
        this.description = description;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    public void setMessage(Message message) {
        this.message = message;
    }

    public Long getId() {
        return id;
    }

    public User getUser() { return user;}

    public String getDescription() {
        return description;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public Message getMessage() {
        return message;
    }

    public static class Builder {
        @JsonProperty("id")
        private Long id;

        private String user;
        @JsonProperty("description")
        private String description;

        @JsonProperty("time")
        private LocalDateTime time;

        @JsonProperty("message")
        private Message message;

        public Builder setDescription(String description) {
            this.description = description;
            return this;
        }

        public Builder setTime(LocalDateTime time) {
            this.time = time;
            return this;
        }

        public Builder setMessage(Message message) {
            this.message = message;
            return this;
        }

        public Comment build() {
            return new Comment(this);
        }
    }
}
