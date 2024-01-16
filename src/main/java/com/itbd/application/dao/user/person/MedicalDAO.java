package com.itbd.application.dao.user.person;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.itbd.application.constants.GenderEnum;
import com.itbd.application.dao.AbstractEntity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "t_per_medical")
@Getter
@Setter
public class MedicalDAO extends AbstractEntity<Long> {

    @Id
    @Column(name = "id_medical_key", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_medical_ver", nullable = false)
    @Version
    private Long version;

    @Column(precision = 8, scale = 3, name = "flt_weight")
    private BigDecimal weight;

    @Column(precision = 8, scale = 3, name = "flt_height")
    private BigDecimal height;

    @Column(name = "ct_children")
    private Long children;

    @Column(name = "tx_medical_history")
    private String medicalHistory;

    @Enumerated(EnumType.STRING)
    private GenderEnum gender;

    // @ManyToOne(fetch = FetchType.LAZY)
    // @JoinColumn(name = "id_person_key", nullable = false)
    @OneToOne
    // @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_person_key")
    @JsonBackReference
    private PersonDAO personKey;

}
