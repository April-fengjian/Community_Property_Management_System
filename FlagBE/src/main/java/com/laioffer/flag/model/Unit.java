package com.laioffer.flag.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "unit")
@JsonDeserialize(builder = Unit.Builder.class)
public class Unit implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    private Long id;

//    @JsonIgnore
//    private String name;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public Unit() { }

    public Unit(Builder builder) {
        this.id = builder.id;
//        this.name = builder.name;
    }

    public static class Builder {

        @JsonProperty("id")
        private Long id;
//
//        @JsonProperty("name")
//        private String name;

        public Unit.Builder setId(Long id) {
            this.id = id;
            return this;
        }

        public Unit.Builder setName(String name) {
//            this.name = name;
            return this;
        }

        public Unit build() {
            return new Unit(this);
        }
    }
}
