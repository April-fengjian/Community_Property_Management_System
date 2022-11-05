package com.laioffer.flag.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "room")
@JsonDeserialize(builder = Room.Builder.class)
public class Room implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    private Long id;
    @JsonProperty("name")
    private String name;
    @JsonProperty("maxcapacity")
    private int maxcapacity;

//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    private User user;
    @JsonIgnore
    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, fetch=FetchType.LAZY)
    private List<RoomReservedDateTime> reservedDates;

    public Room() {}

    private Room(Builder builder) {
        this.id = builder.id;
        this.name = builder.name;
        this.maxcapacity = builder.maxcapacity;
//        this.user = builder.user;
        this.reservedDates = builder.reservedDates;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getCapacity() {
        return maxcapacity;
    }

//    public User getUser() {
//        return user;
//    }

    public List<RoomReservedDateTime> getReservedDates() {
        return reservedDates;
    }



    public static class Builder {

        @JsonProperty("id")
        private Long id;

        @JsonProperty("name")
        private String name;

        @JsonProperty("maxcapacity")
        private int maxcapacity;

//        @JsonProperty("user")
//        private User user;
        @JsonProperty("dates")
        private List<RoomReservedDateTime> reservedDates;

        public Builder setId(Long id) {
            this.id = id;
            return this;
        }

        public Builder setName(String name) {
            this.name = name;
            return this;
        }

        public Builder setCapacity(int maxcapacity) {
            this.maxcapacity = maxcapacity;
            return this;
        }

//        public Builder setUser(User user) {
//            this.user = user;
//            return this;
//        }

        public Builder setReservedDates(List<RoomReservedDateTime> reservedDates) {
            this.reservedDates = reservedDates;
            return this;
        }


        public Room build() {
            return new Room(this);
        }
    }

}
