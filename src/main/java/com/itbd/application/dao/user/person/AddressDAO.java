package com.itbd.application.dao.user.person;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.itbd.application.dao.AbstractEntity;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "t_per_address")
@Getter
@Setter
public class AddressDao extends AbstractEntity<Long> {
    @Id
    @Column(name = "id_address_key", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Version
    @Nullable
    @Column(name = "id_address_ver", nullable = false)
    private Long version;

    @Column(name = "tx_birth_place")
    private String birthPlace;

    @Column(name = "tx_death_place")
    private String deathPlace;

    @Column(name = "tx_home_location")
    private String homeLocation;

    @Column(name = "tx_present_address")
    private String presentAddress;

    @Column(name = "tx_permanent_address")
    private String permanentAddress;

    @OneToOne
    @JoinColumn(name = "id_person_key")
    @JsonBackReference
    private PersonDao person;
}
