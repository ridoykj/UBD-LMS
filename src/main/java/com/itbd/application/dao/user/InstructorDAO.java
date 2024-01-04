package com.itbd.application.dao.user;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "t_org_instructor")
@Getter
@Setter
public class InstructorDAO {
    @Id
    @Column(name = "id_instructor_key", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column
    private String email;

    @Column
    private String description;

    @Column
    private String designation;

    @Column
    private String qualification;

    @Column(name = "id_course_key")
    private Long courseId;
}