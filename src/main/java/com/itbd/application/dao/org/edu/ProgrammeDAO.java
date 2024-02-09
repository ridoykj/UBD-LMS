package com.itbd.application.dao.org.edu;

import com.itbd.application.constants.enums.ProgrammeTypeEnum;
import com.itbd.application.dao.AbstractEntity;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "t_edu_programme")
public class ProgrammeDAO extends AbstractEntity<Long> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_programme_key", nullable = false, updatable = false)
    private Long id;

    @Version
    @Nullable
    @Column(name = "id_programme_ver", nullable = false)
    private Long version;

    @Column(name = "tx_name", unique = true)
    private String name;

    @Enumerated(EnumType.STRING)
    private ProgrammeTypeEnum studyLevel;

    @Column(name = "tx_code")
    private String code;


    @Column(name = "tx_status")
    private String status;

    @Column(name = "tx_description")
    private String description;

    @ManyToOne
    @JoinColumn(name = "id_department_key", nullable = false)
    private DepartmentDAO department;

    @OneToMany(mappedBy = "programme", cascade = CascadeType.ALL)
    private List<BatchDAO> batches;

//    @OneToMany(mappedBy = "programme", cascade = CascadeType.ALL)
//    private List<CourseDAO> courses;
}