package com.laioffer.flag.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import javax.persistence.*;
import java.io.Serializable;

//import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;


@Entity
@Table(name = "message")
@JsonDeserialize(builder = Message.Builder.class)
public class Message implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String title;
    @Column(name = "time", columnDefinition = "TIMESTAMP")
    private LocalDateTime time;

    private String description;
    @ManyToOne
    @JoinColumn(name = "user")
    private User user;

    @OneToMany(mappedBy = "message", cascade = CascadeType.ALL, fetch=FetchType.EAGER)
    private List<Comment> comments;

    public Message() {}

    private Message(Builder builder) {
        this.id = builder.id;
        this.title = builder.title;
        this.time = builder.time;
        this.description = builder.description;
        this.user = builder.user;
        this.comments = builder.comments;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public User getUser() {
        return user;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
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

        @JsonProperty("comment")
        private List<Comment> comments;

        public Builder setId(Long id) {
            this.id = id;
            return this;
        }

        public Builder setTitle(String title) {
            this.title = title;
            return this;
        }
        public Builder setTime(LocalDateTime time) {
            this.time = time;
            return this;
        }
        public Builder setDescription(String description) {
            this.description = description;
            return this;
        }
        public Builder setUser(User user) {
            this.user = user;
            return this;
        }

        public Builder setComments(List<Comment> comments) {
            this.comments = comments;
            return this;
        }
        public Message build() {
            return new Message(this);
        }
    }
}
