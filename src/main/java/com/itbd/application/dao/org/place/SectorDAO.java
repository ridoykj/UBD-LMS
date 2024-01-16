package com.itbd.application.dao.org.place;

import java.util.List;

import com.itbd.application.dao.AbstractEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "t_place_sector")
@Getter
@Setter
public class SectorDAO  extends AbstractEntity<Long>{
    @Id
    @Column(name = "id_sector_key", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tx_name")
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
    private List<BuildingDAO> buildings;
}
