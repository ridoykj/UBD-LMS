package com.itbd.application.dao.org.place;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.itbd.application.constants.BuildingTypeEnum;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "t_place_building")
@Getter
@Setter
public class BuildingDAO {
    @Id
    @Column(name = "id_building_key", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String buildingName;

    @Enumerated(EnumType.STRING)
    private BuildingTypeEnum type;

    @Column
    private String block;

    @Column
    private Integer floor;

    @Column
    private String room;

    @Column
    private String alternateName;

    @Column
    private LocalDateTime openingTime;

    @Column
    private LocalDateTime closingTime;

    @Column
    private Integer totalElevators;

    @Column
    private Boolean hasElevators;

    @Column
    private Integer totalStair;

    @Column
    private Boolean hasStairAvailable;

    @Column
    private Integer totalEscalator;

    @Column
    private Boolean hasEscalatorAvailable;

    @Column
    private Boolean hasEmergencyExit;

    @Column
    private Boolean hasparkingAvailable;

    @Column
    private Boolean hasToiletAvailable;

    @Column
    private Boolean hasCafeteriaAvailable;

    @Column
    private Boolean hasPublicAccess;

    @Column
    private Boolean hasPetsAllowed;

    @Column
    private Boolean hasSmokingAllowed;

    @Column
    private Boolean parkingAvailable;

    @Column
    private String address;

    @Column
    private String contact;

    @Column
    private BigDecimal buildingHeight;

    @Column
    private BigDecimal buildingWidth;

    @Column
    private BigDecimal buildingLength;

    @Column
    private String buildingColor;

    @Column
    private String pincode;

    @Column
    private String latitude;

    @Column
    private String longitude;

    @Column
    private String googleMapLink;

}
