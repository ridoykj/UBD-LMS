package com.itbd.application.dao.org.academic;

import com.itbd.application.dao.AbstractEntity;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity(name = "t_aca_attendance")
@Getter
@Setter
public class AttendanceDAO extends AbstractEntity<Long> {
    @Id
    @Column(name = "id_attendance_key", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Version
    @Nullable
    @Column(name = "id_attendance_ver", nullable = false)
    private Long version;

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