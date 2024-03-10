package com.itbd.application.dao.org.place;

import com.itbd.application.dao.AbstractEntity;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "t_place_floor", uniqueConstraints = {@UniqueConstraint(name = "ctx_floor_unique", columnNames = {"name", "floorLevel", "building"})})
public class FloorDao extends AbstractEntity<Long> {
    @Id
    @Column(name = "id_floor_key", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Version
    @Nullable
    @Column(name = "id_floor_ver", nullable = false)
    private Long version;

    @Column(name = "tx_name")
    private String name;

    @Column(name = "tx_alternate_name")
    private String alternateName;

    @Column(name = "tx_description")
    private String description;

    @Column(name = "tx_contact")
    private String contact;

    @Column(name = "ct_floor_level")
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
    private List<RoomDao> rooms;


    @ManyToOne
    @JoinColumn(name = "id_building_key")
    private BuildingDao building;

}
