package com.laioffer.flag.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Date;


@Entity
@Table(name = "service_request")
@JsonDeserialize(builder = ServiceRequest.Builder.class)
public class ServiceRequest implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String title;

    private String status;

    private String description;

    private String category;

    private Date time;

    @ManyToOne
    @JoinColumn(name = "tenant_id")
    private User tenant;

    @ManyToOne
    @JoinColumn(name = "provider_id")
    private User provider;


    public ServiceRequest() {}

    private ServiceRequest(Builder builder) {
        this.id = builder.id;
        this.title = builder.title;
        this.status = builder.status;
        this.description = builder.description;
        this.category = builder.category;
        this.time = builder.time;
        this.tenant = builder.tenant;
        this.provider = builder.provider;
    }


    public Long getId() {
        return id;
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

    public User getTenant() {
        return tenant;
    }

    public User getProvider() {
        return provider;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public void setTenant(User tenant) {
        this.tenant = tenant;
    }

    public void setProvider(User provider) {
        this.provider = provider;
    }

    public static class Builder {
        @JsonProperty("id")
        private Long id;

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

        @JsonProperty("tenant")
        private User tenant;

        @JsonProperty("provider")
        private User provider;

        public Builder setId(Long id) {
            this.id = id;
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

        public Builder setTenant(User tenant) {
            this.tenant = tenant;
            return this;
        }

        public Builder setProvider(User provider) {
            this.provider = provider;
            return this;
        }

        public ServiceRequest build() {
            return new ServiceRequest(this);
        }
    }
}
