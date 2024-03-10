package com.itbd.application.dao.org.place;

import com.itbd.application.constants.enums.BuildingTypeEnum;
import com.itbd.application.dao.AbstractEntity;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Entity(name = "t_place_building")
@Getter
@Setter
public class BuildingDao extends AbstractEntity<Long> {
    @Id
    @Column(name = "id_building_key", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Version
    @Nullable
    @Column(name = "id_building_ver", nullable = false)
    private Long version;

    @Column(name = "tx_name", unique = true)
    private String name;

    @Enumerated(EnumType.STRING)
    private BuildingTypeEnum type;

    @Column(name = "tx_block")
    private String block;

    @Column(name = "ct_floor")
    private Integer totalFloor;

    @Column(name = "ct_room")
    private Integer totalRoom;

    @Column(name = "tx_alternate_name")
    private String alternateName;

    @Column(name = "dtt_opening_date")
    private LocalDateTime openingDate;

    @Column(name = "dtt_closing_date")
    private LocalDateTime closingDate;

    @Column(name = "dt_opening_time")
    private LocalTime openingTime;

    @Column(name = "dt_closing_time")
    private LocalTime closingTime;

    @Column(name = "ct_total_elevators")
    private Integer totalElevators;

    @Column(name = "has_elevators")
    private Boolean hasElevators;

    @Column(name = "ct_total_stair")
    private Integer totalStair;

    @Column(name = "has_stair_available")
    private Boolean hasStairAvailable;

    @Column(name = "ct_total_escalator")
    private Integer totalEscalator;

    @Column(name = "has_escalator_available")
    private Boolean hasEscalatorAvailable;

    @Column(name = "has_emergency_exit")
    private Boolean hasEmergencyExit;

    @Column(name = "has_parking_available")
    private Boolean hasParkingAvailable;

    @Column(name = "has_toilet_available")
    private Boolean hasToiletAvailable;

    @Column(name = "has_cafeteria_available")
    private Boolean hasCafeteriaAvailable;

    @Column(name = "has_public_access")
    private Boolean hasPublicAccess;

    @Column(name = "has_pets_allowed")
    private Boolean hasPetsAllowed;

    @Column(name = "has_smoking_allowed")
    private Boolean hasSmokingAllowed;

    @Column(name = "has_wifi_available")
    private Boolean hasWifiAvailable;

    @Column(name = "has_cctv_available")
    private Boolean hasCctvAvailable;

    @Column(name = "has_security_guard")
    private Boolean hasSecurityGuard;

    @Column(name = "has_fire_alarm")
    private Boolean hasFireAlarm;

    @Column(name = "has_fire_extinguisher")
    private Boolean hasFireExtinguisher;

    @Column(name = "has_fire_hydrant")
    private Boolean hasFireHydrant;

    @Column(name = "tx_address")
    private String address;

    @Column(name = "tx_contact")
    private String contact;

    @Column(name = "flt_building_height")
    private BigDecimal buildingHeight;

    @Column(name = "flt_building_width")
    private BigDecimal buildingWidth;

    @Column(name = "flt_building_length")
    private BigDecimal buildingLength;

    @Column(name = "tx_building_color")
    private String buildingColor;

    @Column(name = "tx_building_color_code")
    private String buildingColorCode;

    @Column(name = "tx_building_image")
    private String pincode;

    @Column(name = "flt_latitude")
    private BigDecimal latitude;

    @Column(name = "flt_longitude")
    private BigDecimal longitude;

    @Column(name = "tx_google_map_link")
    private String googleMapLink;

    @OneToMany(mappedBy = "building")
    private List<FloorDao> floors;


    @ManyToOne
    @JoinColumn(name = "id_sector_key")
    private SectorDao sector;


}
