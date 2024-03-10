package com.itbd.application.dao.user;

import com.itbd.application.dao.AbstractEntity;
import com.itbd.application.dao.org.allocation.BatchCoordinatorDao;
import com.itbd.application.dao.org.edu.ReservationDao;
import com.itbd.application.dao.user.person.PersonDao;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Entity(name = "t_org_instructor")
@Getter
@Setter
public class InstructorDao extends AbstractEntity<Long> {
    @Id
    @Column(name = "id_instructor_key", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Version
    @Nullable
    @Column(name = "id_instructor_ver", nullable = false)
    private Long version;

    @Column(name = "tx_name")
    private String name;

    @Column(name = "tx_email")
    private String email;

    @Column(name = "tx_description")
    private String description;

    @Column(name = "tx_designation")
    private String designation;

    @Column(name = "tx_qualification")
    private String qualification;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_person_key")
    // @JsonBackReference
    private PersonDao person;

    @OneToMany(mappedBy = "instructor")
    private Set<ReservationDao> reservations;

    @OneToMany(mappedBy = "instructor")
    private Set<BatchCoordinatorDao> batchCoordinators;
}