package com.itbd.application.dao.user.person;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.itbd.application.dao.AbstractEntity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "t_per_occupation")
@Getter
@Setter
public class OccupationDAO extends AbstractEntity<Long> {

    @Id
    @Column(name = "id_occupation_key", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_occupation_ver", nullable = false)
    @Version
    private Long version;

    @Column(columnDefinition = "longtext", name = "tx_records")
    private String records;

    @Column(name = "has_occupation")
    private String hasOccupation;

    // @ManyToOne(fetch = FetchType.LAZY)
    // @JoinColumn(name = "id_person_key", nullable = false)
    @OneToOne
    // @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_person_key")
    @JsonBackReference
    private PersonDAO personKey;
}
