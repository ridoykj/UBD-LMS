package com.itbd.application.dao.user.person;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.itbd.application.constants.enums.BloodGroupsEnum;
import com.itbd.application.dao.AbstractEntity;
import com.itbd.application.dao.user.InstructorDAO;
import com.itbd.application.dao.user.StudentDAO;
import com.itbd.application.dao.user.UserDAO;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Entity(name = "t_per_person")
@Getter
@Setter
public class PersonDAO extends AbstractEntity<Long> {

    @Id
    @Column(name = "id_person_key", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Version
    @Nullable
    @Column(name = "id_person_ver", nullable = false)
    private Long version;

    @Column(length = 128, name = "tx_given_name")
    private String givenName;

    @Column(length = 64, name = "tx_additional_name")
    private String additionalName;

    @Column(length = 64, name = "tx_family_name")
    private String familyName;

    @Column(length = 64, name = "tx_full_name")
    private String alternateName;

    @Column(name = "dtt_birth")
    private LocalDateTime birthDate;

    @Column(name = "dtt_death")
    private LocalDateTime deathDate;

    @Column(columnDefinition = "longtext", name = "tx_ref_person")
    private String refPerson;

    @Column(columnDefinition = "longtext", name = "tx_fllows")
    private String follows;

    @Column(name = "has_occupation")
    private Boolean hasOccupation;

    @Column(length = 8, name = "tx_honorific_prefix")
    private String honorificPrefix;

    @Column(length = 8, name = "tx_honorific_suffix")
    private String honorificSuffix;

    @Column(length = 64, name = "tx_father_name")
    private String fatherName;

    @Column(length = 16, name = "tx_father_phone")
    private String fatherPhone;

    @Column(length = 64, name = "tx_mother_name")
    private String motherName;

    @Column(length = 16, name = "tx_mother_phone")
    private String motherPhone;

    @Column(columnDefinition = "longtext", name = "tx_knows_language")
    private String knowsLanguage;

    @Column(columnDefinition = "longtext", name = "tx_nationality")
    private String nationality;

    @Column(columnDefinition = "longtext", name = "tx_sponsor")
    private String sponsor;

    @Enumerated(EnumType.STRING)
    private BloodGroupsEnum bloodGroup;

    @Column(name = "tx_description", columnDefinition = "longtext")
    private String description;

    @OneToOne(mappedBy = "person", cascade = CascadeType.ALL)
    @ToString.Exclude
    @JsonManagedReference
    private AddressDAO address;

    @OneToOne(mappedBy = "person", cascade = CascadeType.ALL)
    @ToString.Exclude
    @JsonManagedReference
    private ContactDAO contact;

    @OneToOne(mappedBy = "person", cascade = CascadeType.ALL)
    @ToString.Exclude
    @JsonManagedReference
    private DocumentRecordsDAO record;

    @OneToOne(mappedBy = "person", cascade = CascadeType.ALL)
    @ToString.Exclude
    @JsonManagedReference
    private MedicalDAO medical;

    @OneToOne(mappedBy = "person", cascade = CascadeType.ALL)
    @ToString.Exclude
    @JsonManagedReference
    private OccupationDAO occupation;

    @OneToOne(mappedBy = "person", cascade = CascadeType.ALL)
    @ToString.Exclude
    @JsonManagedReference
    private UserDAO user;

    @OneToOne(mappedBy = "person", cascade = CascadeType.ALL)
    @ToString.Exclude
    @JsonManagedReference
    private StudentDAO student;

    @OneToOne(mappedBy = "person", cascade = CascadeType.ALL)
    @ToString.Exclude
//    @JsonManagedReference
    private InstructorDAO instructor;
}
