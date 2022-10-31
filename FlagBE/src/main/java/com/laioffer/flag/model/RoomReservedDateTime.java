package com.laioffer.flag.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "room_reserved_date_time")
public class RoomReservedDateTime implements Serializable {
    private static final long serialVersionUID = 1L;

    @EmbeddedId
    private RoomReservedDateTimeKey id;

    // column room_id also is a forenign key of table room
    @MapsId("room_id")
    @ManyToOne
    private Room room;


    public RoomReservedDateTime() {}

    public RoomReservedDateTime(RoomReservedDateTimeKey id, Room room) {
        this.id = id;
        this.room = room;
    }

    public RoomReservedDateTimeKey getId() {
        return id;
    }

    public Room getRoom() {
        return room;
    }

}
