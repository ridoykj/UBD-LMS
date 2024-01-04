package com.itbd.application.dao.org.place;

import com.itbd.application.constants.RoomTypeEnum;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "t_place_room")
@Getter
@Setter
public class RoomDAO {
    @Id
    @Column(name = "id_room_key", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String roomName;

    @Column
    private String alternateName;

    @Enumerated(EnumType.STRING)
    private RoomTypeEnum type;

    @Column
    private String description;

    @Column
    private String contact;

    @Column
    private Boolean hasPublicAccess;

    @Column
    private Integer totalRooms;

    @Column
    private String block;

    @Column
    private Integer unit;

    @Column
    private Integer totalBeds;

    @Column
    private Integer totalBathrooms;

    @Column
    private Boolean hasKitchen;

    @Column
    Boolean hasBalcony;

    @Column
    private Boolean hasAirConditioner;

    @Column
    private Boolean hasHeater;
}
