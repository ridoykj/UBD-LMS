package com.itbd.application.dao.org.allocation;

import com.itbd.application.dao.AbstractEntity;
import com.itbd.application.dao.org.edu.BatchDao;
import com.itbd.application.dao.org.edu.CourseDao;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Set;

@Entity(name = "t_map_batch_course")
@Getter
@Setter
public class BatchCourseDao extends AbstractEntity<Long> {
    @Id
    @Column(name = "id_batch_course_key", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Version
    @Nullable
    @Column(name = "id_batch_course_ver", nullable = false)
    private Long version;

    @Column(name = "tx_name")
    private String name;

    @Column(name = "tx_headline")
    private String headline;

    @Column(name = "tx_code")
    private String code;

    @Column(name = "tx_type")
    private String type;

    @Column(name = "ct_semester")
    private Long semester;

    @Column(name = "ct_credits")
    private BigDecimal numberOfCredits;

    @Column(name = "ct_lecture_capacity")
    private BigDecimal numberOfLecture;

    @Column(name = "ct_tutorial_capacity")
    private BigDecimal numberOfTutorial;

    @Column(name = "ct_duration")
    private BigDecimal duration;

    @Column(name = "tx_duration_unit")
    private String durationUnit;

    @Column(name = "tx_prerequisites")
    private String prerequisites;

    @Column(name = "tx_about")
    private String about;

    @ManyToOne
    @JoinColumn(name = "id_course_key")
    private CourseDao course;

    @ManyToOne
    @JoinColumn(name = "id_batch_key")
    private BatchDao batch;

    @OneToMany(mappedBy = "batchCourse", cascade = CascadeType.ALL)
    private Set<BatchCoordinatorDao> batchCoordinators;
}
