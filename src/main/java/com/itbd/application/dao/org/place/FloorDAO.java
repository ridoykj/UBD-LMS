package com.itbd.application.dao.org.place;

import java.math.BigDecimal;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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

    @Column(name = "tx_name")
    private String name;

    @Column(name = "tx_alternate_name")
    private String alternateName;

    @Column(name = "tx_description")
    private String description;

    @Column(name = "tx_contact")
    private String contact;

    @Column(name = "tx_block")
    private Integer floorLevel;

    @Column(name = "flt_height")
    private BigDecimal floorHeight;

    @Column(name = "flt_width")
    private BigDecimal floorWidth;

    @Column(name = "flt_length")
    private BigDecimal floorLength;

    @Column(name = "tx_color")
    private String floorColor;

    @Column(name = "tx_color_code")
    private String floorColorCode;

    @Column(name = "ct_total_rooms")
    private Integer totalRooms;

    @Column(name = "ct_total_blocks")
    private Integer totalBlocks;

    @Column(name = "ct_total_units")
    private Integer totalUnits;

    @Column(name = "ct_total_exits")
    private Integer totalExits;

    
    @OneToMany(mappedBy = "floor")
    private List<RoomDAO> rooms;

    
    @ManyToOne
    @JoinColumn(name = "id_building_key")
    private BuildingDAO building;

}
