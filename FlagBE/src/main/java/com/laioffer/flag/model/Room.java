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
public class Room implements Serializable{
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer room_id;

    private String room_name;

    private Integer max_capacity;

    private String image_url;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "room_id",referencedColumnName = "room_id")
    private Booking booking;


    public Room() {}

    private Room(Builder builder) {
        this.room_id = builder.room_id;
        this.room_name = builder.room_name;
        this.max_capacity = builder.max_capacity;
        this.image_url = builder.image_url;
    }

    public Integer getId() {
        return room_id;
    }

    public String getName() {
        return room_name;
    }

    public Integer getMaxCapacity() {
        return max_capacity;
    }


    public static class Builder {

        @JsonProperty("room_id")
        private Integer room_id;

        @JsonProperty("room_name")
        private String room_name;

        @JsonProperty("max_capacity")
        private Integer max_capacity;

        @JsonProperty("image_url")
        private String image_url;


        public Builder setId(Integer room_id) {
            this.room_id = room_id;
            return this;
        }

        public Builder setName(String room_name) {
            this.room_name = room_name;
            return this;
        }

        public Builder setDescription(Integer max_capacity) {
            this.max_capacity = max_capacity;
            return this;
        }

        public Builder setAddress(String image_url) {
            this.image_url = image_url;
            return this;
        }




        public Room build() {
            return new Room(this);
        }
    }
}
