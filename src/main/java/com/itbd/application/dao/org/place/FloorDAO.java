package com.itbd.application.dao.org.place;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "t_place_floor")
@Getter
@Setter
public class FloorDAO {
    @Id
    @Column(name = "id_floor_key", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String floorName;

    @Column
    private String alternateName;

    @Column
    private String description;

    @Column
    private String contact;

    @Column
    private Integer floorLevel;

    @Column
    private BigDecimal floorHeight;

    @Column
    private BigDecimal floorWidth;

    @Column
    private BigDecimal floorLength;

    @Column
    private String floorColor;

    @Column
    private Integer totalRooms;

    @Column
    private Integer totalBlocks;

    @Column
    private Integer totalUnits;

    @Column
    private Integer totalExits;
}
