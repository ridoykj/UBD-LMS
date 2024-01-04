package com.itbd.application.dao.org.place;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "t_place_sector")
@Getter
@Setter
public class SectorDAO {
    @Id
    @Column(name = "id_sector_key", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String sectorName;

    @Column
    private String alternateName;

    @Column
    private String city;

    @Column
    private String state;

    @Column
    private String country;

    @Column
    private String contact;

    @Column
    private String description;
}
