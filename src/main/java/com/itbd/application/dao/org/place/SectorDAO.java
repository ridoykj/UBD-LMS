package com.itbd.application.dao.org.place;

import com.itbd.application.dao.AbstractEntity;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity(name = "t_place_sector")
@Getter
@Setter
public class SectorDao extends AbstractEntity<Long> {
    @Id
    @Column(name = "id_sector_key", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Version
    @Nullable
    @Column(name = "id_sector_ver", nullable = false)
    private Long version;

    @Column(name = "tx_name", unique = true)
    private String name;

    @Column(name = "tx_alternate_name")
    private String alternateName;

    @Column(name = "tx_sector_code")
    private String city;

    @Column(name = "tx_state")
    private String state;

    @Column(name = "tx_country")
    private String country;

    @Column(name = "tx_contact")
    private String contact;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "sector")
    private List<BuildingDao> buildings;
}
