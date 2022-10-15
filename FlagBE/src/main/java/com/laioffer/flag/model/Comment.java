package com.laioffer.flag.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Date;


@Entity
@Table(name = "comment")
@JsonDeserialize(builder = Comment.Builder.class)
public class Comment implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long comment_id;
    private String comment;
    private Date time;
    @ManyToOne
    @JoinColumn(name = "message_id")
    private Message message;

    public Comment() {}

    public Comment(Builder builder) {
        this.comment_id = builder.comment_id;
        this.comment = builder.comment;
        this.time = builder.time;
        this.message = builder.message;
    }

    public void setComment_id(Long comment_id) {
        this.comment_id = comment_id;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public void setMessage(Message message) {
        this.message = message;
    }

    public Long getComment_id() {
        return comment_id;
    }

    public String getComment() {
        return comment;
    }

    public Date getTime() {
        return time;
    }

    public Message getMessage() {
        return message;
    }

    public static class Builder {
        @JsonProperty("comment_id")
        private Long comment_id;

        @JsonProperty("comment")
        private String comment;

        @JsonProperty("time")
        private Date time;

        @JsonProperty("message")
        private Message message;

        public Builder setComment(String comment) {
            this.comment = comment;
            return this;
        }

        public Builder setTime(Date time) {
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
