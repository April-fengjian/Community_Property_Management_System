package com.laioffer.flag.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import javax.persistence.*;
import java.io.Serializable;
@Entity
@Table(name = "room")
//@JsonDeserialize(builder = Room.Builder.class)
public class Room {
    @Id
    private Integer room_id;

}
