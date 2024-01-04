package com.itbd.application.dao.org;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "t_org_class")
@Getter
@Setter
public class ClassDAO {
    @Id
    @Column(name = "id_class_key", nullable = false, updatable = false)
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

    // @OneToOne
    // @JoinColumn(name = "id_person_key")
    // private PersonDAO personKey;
}
