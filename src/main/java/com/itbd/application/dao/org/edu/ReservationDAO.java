package com.itbd.application.dao.org.edu;

import java.time.LocalDate;

import com.itbd.application.dao.org.place.RoomDAO;
import com.itbd.application.dao.user.InstructorDAO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "t_edu_reservation")
@Getter
@Setter
public class ReservationDAO {
    @Id
    @Column(name = "id_reservation_key", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tx_name")
    private String name;

    @Column(name = "tx_code")
    private String code;

    @Column(name = "tx_description")
    private String description;

    @Column(name = "tx_status")
    private String status;

    @Column(name = "tx_group")
    private String group;

    @Column(name = "id_section")
    private Long section;

    @Column(name = "ct_semester")
    private Long semester;

    @Column(name = "ct_shift")
    private Long shift;

    @Column(name = "dt_start")
    private LocalDate startDate;

    @Column(name = "dt_end")
    private LocalDate endDate;

    @Column(name = "ct_duration")
    private Long duration;

    @ManyToOne
    @JoinColumn(name = "id_course_key")
    private CourseDAO course;

    @ManyToOne
    @JoinColumn(name = "id_batch_key")
    private BatchDAO batch;

    @ManyToOne
    @JoinColumn(name = "id_room_key")
    private RoomDAO room;

    @ManyToOne
    @JoinColumn(name = "id_instructor_key")
    private InstructorDAO instructor;

}
