package com.itbd.application.dao.user;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "t_org_student")
@Getter
@Setter
public class Student {
    @Id
    @Column(name = "id_student_key", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column(name = "sms_receive_no")
    private String smsReceiveNo;

    @Column(name = "email_receive")
    private String emailReceive;

    @Column
    private String guardian;

    @Column(name = "guardian_phone")
    private String guardianPhone;

    @Column
    private String status;
}
