package com.laioffer.flag.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "FLAG_room_reserved_date")
public class RoomReservedDate implements Serializable {
    private static final long serialVersionUID = 1L;

    @EmbeddedId
    private RoomReservedDateKey id;

    // column room_id also is a forenign key of table room
    @MapsId("room_id")
    @ManyToOne
    private Room room;


    public RoomReservedDate() {}

    public RoomReservedDate(RoomReservedDateKey id, Room room) {
        this.id = id;
        this.room = room;
    }

    public RoomReservedDateKey getId() {
        return id;
    }

    public Room getRoom() {
        return room;
    }

}
