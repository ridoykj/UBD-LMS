package com.itbd.application.dao.user.person;

import com.itbd.application.dao.AbstractEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "t_per_address")
@Getter
@Setter
public class AddressDAO extends AbstractEntity<Long> {

    @Id
    @Column(name = "id_address_key", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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

    // @ManyToOne(fetch = FetchType.LAZY)
    // @JoinColumn(name = "id_person_key", nullable = false)
    @OneToOne
    // @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_person_key")
    private PersonDAO personKey;

}
