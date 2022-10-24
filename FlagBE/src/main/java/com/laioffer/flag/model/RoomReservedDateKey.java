package com.laioffer.flag.model;

import com.sun.istack.NotNull;
import jdk.jfr.Unsigned;

import javax.persistence.Embeddable;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

@Embeddable
public class RoomReservedDateKey implements Serializable {
    private static final long serialVersionUID = 1L;
    private Long room_id;
    private LocalDate date;

    public RoomReservedDateKey() {}

    public RoomReservedDateKey(Long room_id, LocalDate date) {
        this.room_id = room_id;
        this.date = date;
    }

    public Long getRoom_id() {
        return room_id;
    }

    public RoomReservedDateKey setRoom_id(Long room_id) {
        this.room_id = room_id;
        return this;
    }

    public LocalDate getDate() {
        return date;
    }

    public RoomReservedDateKey setDate(LocalDate date) {
        this.date = date;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RoomReservedDateKey that = (RoomReservedDateKey) o;
        return room_id.equals(that.room_id) && date.equals(that.date);
    }

    @Override
    public int hashCode() {
        return Objects.hash(room_id, date);
    }

}

