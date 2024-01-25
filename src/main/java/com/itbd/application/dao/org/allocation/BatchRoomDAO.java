package com.itbd.application.dao.org.allocation;

import com.itbd.application.constants.CoordinatorTypeEnum;
import com.itbd.application.constants.DayTypeEnum;
import com.itbd.application.dao.AbstractEntity;
import com.itbd.application.dao.org.place.RoomDAO;
import com.itbd.application.dao.user.InstructorDAO;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@Entity
@Table(name = "T_MAP_BATCH_ROOM")
public class BatchRoomDAO extends AbstractEntity<Long> {
    @Id
    @Column(name = "id_batch_room_key", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Version
    @Nullable
    @Column(name = "id_batch_room_ver", nullable = false)
    private Long version;

    @Column(name = "tx_day_name")
    @Enumerated(EnumType.STRING)
    private DayTypeEnum dayName;

    @Column(name = "dt_start")
    private LocalDate startDate;

    @Column(name = "dt_end")
    private LocalDate endDate;

    @Column(name = "tt_start_time")
    private LocalTime startTime;

    @Column(name = "tt_end_time")
    private LocalTime endTime;

    @Column(name = "tx_description")
    private String description;

    @ManyToOne
    @JoinColumn(name = "id_batch_course_key")
    private BatchCourseDAO batchCourse;

    @ManyToOne
    @JoinColumn(name = "id_room_key")
    private RoomDAO room;
}
