package com.itbd.application.dao.user.person;

import java.time.LocalDate;

import com.itbd.application.constants.BloodGroupsEnum;
import com.itbd.application.dao.AbstractEntity;
import com.itbd.application.dao.user.UserDAO;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Version;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "t_per_person")
@Getter
@Setter
public class PersonDAO extends AbstractEntity<Long> {

    @Id
    @Column(name = "id_person_key", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_person_ver", nullable = false)
    @Version
    private Long version;

    @Column(length = 128)
    private String givenName;

    @Column(length = 64)
    private String additionalName;

    @Column(length = 64)
    private String familyName;

    @Column(length = 64)
    private String alternateName;

    @Column
    private LocalDate birthDate;

    @Column
    private LocalDate deathDate;

    @Column(columnDefinition = "longtext")
    private String refPerson;

    @Column(columnDefinition = "longtext")
    private String follows;

    @Column
    private Boolean hasOccupation;

    @Column(length = 8)
    private String honorificPrefix;

    @Column(length = 8)
    private String honorificSuffix;

    @Column(length = 64)
    private String fatherName;

    @Column(length = 16)
    private String fatherPhoneNo;

    @Column(length = 64)
    private String motherName;

    @Column(length = 16)
    private String motherPhoneNo;

    @Column(columnDefinition = "longtext")
    private String knowsLanguage;

    @Column(columnDefinition = "longtext")
    private String nationality;

    @Column(columnDefinition = "longtext")
    private String sponsor;

    @Enumerated(EnumType.STRING)
    private BloodGroupsEnum bloodGroup;

    @Column(name = "tx_description", columnDefinition = "longtext")
    private String description;

    @OneToOne(mappedBy = "personKey", cascade = CascadeType.ALL)
    private AddressDAO addresses;

    @OneToOne(mappedBy = "personKey", cascade = CascadeType.ALL)
    private ContactDAO contacts;

    @OneToOne(mappedBy = "personKey", cascade = CascadeType.ALL)
    private DocumentRecordsDAO recordses;

    @OneToOne(mappedBy = "personKey", cascade = CascadeType.ALL)
    private MedicalDAO medicals;

    @OneToOne(mappedBy = "personKey", cascade = CascadeType.ALL)
    private OccupationDAO occupations;

    @OneToOne(mappedBy = "personKey", cascade = CascadeType.ALL)
    private UserDAO users;

}
