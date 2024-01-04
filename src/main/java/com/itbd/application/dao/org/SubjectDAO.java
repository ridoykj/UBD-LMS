package com.itbd.application.dao.org;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "t_org_subject")
@Getter
@Setter
public class SubjectDAO {
    @Id
    @Column(name = "id_subject_key", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column
    private String code;

    @Column
    private String type;

    @Column
    private Long classId;

    @Column
    private String status;

    @Column
    private Integer order;

    @Column
    private Boolean excludeInResult;

    @Column(name = "id_instructor_key")
    private Long instructorId;
}
