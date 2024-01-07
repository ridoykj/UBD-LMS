package com.itbd.application.dao.org.edu;

import java.math.BigDecimal;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "t_edu_course")
@Getter
@Setter
public class CourseDAO {
    @Id
    @Column(name = "id_course_key", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tx_name")
    private String name;

    @Column(name = "tx_code")
    private String code;

    @Column(name = "tx_prerequisites")
    private String prerequisites;

    @Column(name = "ct_credits")
    private BigDecimal numberOfCredits;

    @Column(name = "tx_headline")
    private String headline;

    @Column(name = "tx_about")
    private String about;

    @Column(name = "ct_student_capacity")
    private BigDecimal numberOfStudents;

    @Column(name = "ct_lecture_capacity")
    private BigDecimal numberOfLecture;

    @Column(name = "ct_tutorial_capacity")
    private BigDecimal numberOfTutorial;

    @Column(name = "tx_type")
    private String type;

    @Column(name = "tx_level")
    private String level;

    @Column(name = "tx_language")
    private String language;

    @Column(name = "tx_category")
    private String category;

    @Column(name = "tx_sub_category")
    private String subCategory;

    @Column(name = "ct_duration")
    private BigDecimal duration;

    @Column(name = "tx_duration_unit")
    private String durationUnit;

    @OneToMany(mappedBy = "course")
    private List<ReservationDAO> reservations;

    @ManyToOne
    @JoinColumn(name = "id_programme_key")
    private ProgrammeDAO programme;
}
