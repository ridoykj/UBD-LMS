package com.itbd.application.dao.org;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "t_org_course")
@Getter
@Setter
public class CourseDAO {
    @Id
    @Column(name = "id_course_key", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column
    private String courseCode;

    @Column
    private String coursePrerequisites;

    @Column
    private BigDecimal numberOfCredits;

    @Column
    private String headline;

    @Column
    private String about;

    @Column
    private BigDecimal studentCapcity;

    @Column
    private BigDecimal numberOfStudents;

    @Column
    private BigDecimal numberOfLecture;

    @Column
    private BigDecimal numberOfTutorial;

    @Column
    private String courseType;

    @Column
    private String courseLevel;

    @Column
    private String courseLanguage;

    @Column
    private String courseCategory;

    @Column
    private String courseSubCategory;

    @Column
    private String courseDuration;

    @Column
    private String courseDurationUnit;

    @Column
    private String courseDurationWeeks;

    @Column
    private String courseDurationHours;
}
