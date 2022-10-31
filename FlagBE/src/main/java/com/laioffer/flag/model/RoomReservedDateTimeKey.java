package com.laioffer.flag.model;

import javax.persistence.Embeddable;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.LocalDateTime;
import java.util.Objects;

@Embeddable
public class RoomReservedDateTimeKey implements Serializable {
    private static final long serialVersionUID = 1L;
    private Long room_id;
    private LocalDateTime dateTime;

    public RoomReservedDateTimeKey() {}

    public RoomReservedDateTimeKey(Long room_id, LocalDateTime dateTime) {
        this.room_id = room_id;
        this.dateTime = dateTime;
    }

    public Long getRoom_id() {
        return room_id;
    }

    public RoomReservedDateTimeKey setRoom_id(Long room_id) {
        this.room_id = room_id;
        return this;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public RoomReservedDateTimeKey setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RoomReservedDateTimeKey that = (RoomReservedDateTimeKey) o;
        return room_id.equals(that.room_id) && dateTime.equals(that.dateTime);
    }

    @Override
    public int hashCode() {
        return Objects.hash(room_id, dateTime);
    }

}

