package com.itbd.application.dao.user;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.itbd.application.dao.AbstractEntity;
import com.itbd.application.dao.org.edu.BatchDAO;
import com.itbd.application.dao.user.person.PersonDAO;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "t_org_student")
@Getter
@Setter
public class StudentDAO extends AbstractEntity<Long> {
    @Id
    @Column(name = "id_student_key", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_student_ver", nullable = false)
    @Version
    private Long version;

    @Column(name = "tx_name")
    private String name;

    @Column(name = "sms_receive_no")
    private String smsReceiveNo;

    @Column(name = "email_receive")
    private String emailReceive;

    @Column(name = "tx_guardian")
    private String guardian;

    @Column(name = "guardian_phone")
    private String guardianPhone;

    @Column(name = "tx_status")
    private String status;

    @ManyToOne
    @JoinColumn(name = "id_batch_key")
    private BatchDAO batch;

    @OneToOne
    @JoinColumn(name = "id_person_key")
    @JsonBackReference
    private PersonDAO person;
}
