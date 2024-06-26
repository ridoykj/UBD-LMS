package com.itbd.application.dao.user;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.itbd.application.dao.AbstractEntity;
import com.itbd.application.dao.org.edu.BatchDao;
import com.itbd.application.dao.user.person.PersonDao;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "t_org_student")
@Getter
@Setter
public class StudentDao extends AbstractEntity<Long> {
    @Id
    @Column(name = "id_student_key", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Version
    @Nullable
    @Column(name = "id_student_ver", nullable = false)
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
    private BatchDao batch;

    @OneToOne
    @JoinColumn(name = "id_person_key")
    @JsonBackReference
    private PersonDao person;
}
