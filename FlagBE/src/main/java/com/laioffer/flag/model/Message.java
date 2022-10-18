package com.laioffer.flag.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import javax.persistence.*;
import java.io.Serializable;

//import java.sql.Date;
import java.time.LocalDate;
import java.util.List;


@Entity
@Table(name = "message")
@JsonDeserialize(builder = Message.Builder.class)
public class Message implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long message_id;
    private String title;

    private LocalDate time;

    private String description;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User host;

    @OneToMany(mappedBy = "message", cascade = CascadeType.ALL, fetch=FetchType.EAGER)
    private List<Comment> comments;

    public Message() {}

    private Message(Builder builder) {
        this.message_id = builder.message_id;
        this.title = builder.title;
        this.time = builder.time;
        this.description = builder.description;
        this.host = builder.host;
        this.comments = builder.comments;
    }

    public LocalDate getTime() {
        return time;
    }

    public void setTime(LocalDate time) {
        this.time = time;
    }

    public Long getMessage_id() {
        return message_id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public User getHost() {
        return host;
    }

    public void setMessage_id(Long message_id) {
        this.message_id = message_id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setHost(User host) {
        this.host = host;
    }

    public static class Builder {
        @JsonProperty("id")
        private Long message_id;

        @JsonProperty("title")
        private String title;

        @JsonProperty("time")
        private LocalDate time;

        @JsonProperty("description")
        private String description;

        @JsonProperty("host")
        private User host;

        @JsonProperty("comment")
        private List<Comment> comments;

        public Builder setId(Long id) {
            this.message_id = id;
            return this;
        }

        public Builder setTitle(String title) {
            this.title = title;
            return this;
        }
        public Builder setTime(LocalDate time) {
            this.time = time;
            return this;
        }
        public Builder setDescription(String description) {
            this.description = description;
            return this;
        }
        public Builder setHost(User host) {
            this.host = host;
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
