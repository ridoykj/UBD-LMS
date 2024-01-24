package com.itbd.application.dao.org.allocation;

import com.itbd.application.constants.CoordinatorTypeEnum;
import com.itbd.application.dao.AbstractEntity;
import com.itbd.application.dao.user.InstructorDAO;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "t_map_batch_coordinator")
@Getter
@Setter
public class BatchCoordinatorDAO extends AbstractEntity<Long> {
    @Id
    @Column(name = "id_batch_coordinator_key", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Version
    @Nullable
    @Column(name = "id_batch_coordinator_ver", nullable = false)
    private Long version;

    @Column(name = "tx_type")
    @Enumerated(EnumType.STRING)
    private CoordinatorTypeEnum type;

    @ManyToOne
    @JoinColumn(name = "id_batch_course_key")
    private BatchCourseDAO batchCourse;

    @ManyToOne
    @JoinColumn(name = "id_instructor_key")
    private InstructorDAO instructor;

    //    @OneToMany(mappedBy = "course")
//    private List<ReservationDAO> reservations;
//
//    @ManyToOne
//    @JoinColumn(name = "id_programme_key")
//    private ProgrammeDAO programme;
}
