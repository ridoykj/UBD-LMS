package com.itbd.application.dao.org.place;

import java.util.List;

import com.itbd.application.constants.RoomTypeEnum;
import com.itbd.application.constants.UnitTypeEnum;
import com.itbd.application.dao.AbstractEntity;
import com.itbd.application.dao.org.edu.ReservationDAO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "t_place_room")
@Getter
@Setter
public class RoomDAO  extends AbstractEntity<Long>{
    @Id
    @Column(name = "id_room_key", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tx_name")
    private String name;

    @Column(name = "tx_alternate_name")
    private String alternateName;

    @Enumerated(EnumType.STRING)
    private RoomTypeEnum type;

    @Column(name = "tx_description")
    private String description;

    @Column(name = "tx_contact")
    private String contact;

    @Column(name = "has_public_access")
    private Boolean hasPublicAccess;

    @Column(name = "ct_total_rooms")
    private Integer totalRooms;

    @Column(name = "tx_block")
    private String block;

    @Column(name = "tx_unit")
    private UnitTypeEnum unit;

    @Column(name = "ct_total_beds")
    private Integer totalBeds;

    @Column(name = "ct_total_bathrooms")
    private Integer totalBathrooms;

    @Column(name = "has_kitchen")
    private Boolean hasKitchen;

    @Column(name = "has_balcony")
    private Boolean hasBalcony;

    @Column(name = "has_air_conditioner")
    private Boolean hasAirConditioner;

    @Column(name = "has_heater")
    private Boolean hasHeater;

    @ManyToOne
    @JoinColumn(name = "id_floor_key")
    private FloorDAO floor;

    @OneToMany(mappedBy = "room")
    private List<ReservationDAO> reservations;

}
