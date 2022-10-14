package com.laioffer.flag.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "service_request")
@JsonDeserialize(builder = ServiceRequest.Builder.class)
public class ServiceRequest implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long maintenance_id;

    private String title;

    private String status;

    private String description;

    private String category;

    private Date time;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User host;


    public ServiceRequest() {}

    private ServiceRequest(Builder builder) {
        this.maintenance_id = builder.maintenance_id;
        this.title = builder.title;
        this.status = builder.status;
        this.description = builder.description;
        this.category = builder.category;
        this.time = builder.time;
        this.host = builder.host;
    }

    public Long getMaintenance_id() {
        return maintenance_id;
    }

    public String getTitle() {
        return title;
    }

    public String getStatus() {
        return status;
    }

    public String getDescription() {
        return description;
    }

    public String getCategory() {
        return category;
    }

    public Date getTime() {
        return time;
    }

    public User getHost() {
        return host;
    }

    public static class Builder {
        @JsonProperty("maintenance_id")
        private Long maintenance_id;

        @JsonProperty("title")
        private String title;

        @JsonProperty("status")
        private String status;

        @JsonProperty("description")
        private String description;

        @JsonProperty("category")
        private String category;

        @JsonProperty("time")
        private Date time;

        @JsonProperty("host")
        private User host;

        public Builder setId(Long maintenance_id) {
            this.maintenance_id = maintenance_id;
            return this;
        }

        public Builder setTitle(String title) {
            this.title = title;
            return this;
        }

        public Builder setStatus(String status) {
            this.status = status;
            return this;
        }

        public Builder setDescription(String description) {
            this.description = description;
            return this;
        }

        public Builder setCategory(String category) {
            this.category = category;
            return this;
        }

        public Builder setTime(Date time) {
            this.time = time;
            return this;
        }

        public Builder setHost(User host) {
            this.host = host;
            return this;
        }

        public ServiceRequest builder() {
            return new ServiceRequest(this);
        }
    }
}
