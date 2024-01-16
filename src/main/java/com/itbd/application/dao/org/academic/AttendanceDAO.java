package com.itbd.application.dao.org.academic;

import java.time.LocalDateTime;

import com.itbd.application.dao.AbstractEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "t_aca_attendance")
@Getter
@Setter
public class AttendanceDAO  extends AbstractEntity<Long>{
    @Id
    @Column(name = "id_attendance_key", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // @Column
    // private String studentName;

    // @Column(name = "academic_year_id")
    // private Long academicYearId;

    // @Column(name = "class_id")
    // private Long classId;

    @Column(name = "registration_id")
    private Long registrationId;

    @Column(name = "in_time")
    private LocalDateTime inTime;

    @Column(name = "out_time")
    private LocalDateTime outTime;

    @Column(name = "staying_hour")
    private Double stayingHour;

    @Column
    private String status;

    @Column
    private Boolean present;
}