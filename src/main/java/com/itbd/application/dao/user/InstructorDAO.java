package com.itbd.application.dao.user;

import java.util.List;

import com.itbd.application.dao.org.edu.ReservationDAO;
import com.itbd.application.dao.user.person.PersonDAO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "t_org_instructor")
@Getter
@Setter
public class InstructorDAO {
    @Id
    @Column(name = "id_instructor_key", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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

    @OneToMany(mappedBy = "instructor")
    private List<ReservationDAO> reservations;

    @OneToOne
    @JoinColumn(name = "id_person_key")
    private PersonDAO personKey;

}