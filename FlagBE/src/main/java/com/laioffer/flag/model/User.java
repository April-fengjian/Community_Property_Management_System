package com.laioffer.flag.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "user")
@JsonDeserialize(builder = User.Builder.class)
public class User implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    private String username;
    @ManyToOne
    @JoinColumn(name = "unit_id")
    private Unit unit;
    @JsonIgnore
    private String password;
    @JsonIgnore
    private String email;
    @JsonIgnore
    private Long phone;
    @JsonIgnore
    private boolean enabled;

    private String avatar;

    public User() {

    }

    public User(Builder builder) {
        this.username = builder.username;
        this.password = builder.password;
        this.email = builder.email;
        this.phone = builder.phone;
        this.enabled = builder.enabled;
        this.avatar = builder.avatar;
        this.unit = builder.unit;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }


    public Unit getUnit() {
        return unit;
    }


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setUnit(Unit unit) {
        this.unit = unit;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getPhone() {
        return phone;
    }

    public void setPhone(Long phone) {
        this.phone = phone;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public static class Builder {
        @JsonProperty("username")
        private String username;
        @JsonProperty("password")
        private String password;
        @JsonProperty("email")
        private String email;
        @JsonProperty("phone")
        private Long phone;
        @JsonProperty("enabled")
        private boolean enabled;

        @JsonProperty("unit")
        private Unit unit;
        
        private String avatar;

        public Builder setUsername(String username) {
            this.username = username;
            return this;
        }

        public Builder setPassword(String password) {
            this.password = password;
            return this;
        }

        public Builder setEmail(String email) {
            this.email = email;
            return this;
        }

        public Builder setPhone(Long phone) {
            this.phone = phone;
            return this;
        }

        public Builder setEnabled(boolean enabled) {
            this.enabled = enabled;
            return this;
        }

        public Builder setUnit(Unit unit) {
            this.unit = unit;
            return this;
        }

        public User build() {
            return new User(this);
        }


    }
}
