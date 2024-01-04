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

    @Column
    private String birthPlace;

    @Column
    private String deathPlace;

    @Column
    private String homeLocation;

    @Column
    private String presentAddress;

    @Column
    private String permanentAddress;

    // @ManyToOne(fetch = FetchType.LAZY)
    // @JoinColumn(name = "id_person_key", nullable = false)
    @OneToOne
    // @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_person_key")
    private PersonDAO personKey;

}
