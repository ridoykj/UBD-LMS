package com.itbd.application.dao.org.allocation;

import com.itbd.application.constants.enums.CoordinatorTypeEnum;
import com.itbd.application.dao.AbstractEntity;
import com.itbd.application.dao.user.InstructorDao;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "t_map_batch_coordinator")
@Getter
@Setter
public class BatchCoordinatorDao extends AbstractEntity<Long> {
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
    private BatchCourseDao batchCourse;

    @ManyToOne
    @JoinColumn(name = "id_instructor_key")
    private InstructorDao instructor;

    //    @OneToMany(mappedBy = "course")
//    private List<ReservationDAO> reservations;
//
//    @ManyToOne
//    @JoinColumn(name = "id_programme_key")
//    private ProgrammeDAO programme;
}
