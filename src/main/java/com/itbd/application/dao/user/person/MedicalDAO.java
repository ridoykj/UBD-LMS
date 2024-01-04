package com.itbd.application.dao.user.person;

import java.math.BigDecimal;

import com.itbd.application.constants.GenderEnum;
import com.itbd.application.dao.AbstractEntity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
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

    @Column(precision = 8, scale = 3)
    private BigDecimal weight;

    @Column(precision = 8, scale = 3)
    private BigDecimal height;

    @Column
    private Long children;

    @Enumerated(EnumType.STRING)
    private GenderEnum gender;

    // @ManyToOne(fetch = FetchType.LAZY)
    // @JoinColumn(name = "id_person_key", nullable = false)
    @OneToOne
    // @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_person_key")
    private PersonDAO personKey;

}
