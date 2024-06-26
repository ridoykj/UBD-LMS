package com.itbd.application.dao.org.edu;

import com.itbd.application.dao.AbstractEntity;
import com.itbd.application.dao.org.place.RoomDao;
import com.itbd.application.dao.user.InstructorDao;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity(name = "t_edu_reservation")
@Getter
@Setter
public class ReservationDao extends AbstractEntity<Long> {
    @Id
    @Column(name = "id_reservation_key", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Version
    @Nullable
    @Column(name = "id_reservation_ver", nullable = false)
    private Long version;

    @Column(name = "tx_name")
    private String name;

    @Column(name = "tx_code")
    private String code;

    @Column(name = "tx_type")
    private String type;

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

//    @ManyToOne
//    @JoinColumn(name = "id_course_key")
//    private CourseDAO course;

    @ManyToOne
    @JoinColumn(name = "id_batch_key")
    private BatchDao batch;

    @ManyToOne
    @JoinColumn(name = "id_room_key")
    private RoomDao room;

    @ManyToOne
    @JoinColumn(name = "id_instructor_key")
    private InstructorDao instructor;

}
