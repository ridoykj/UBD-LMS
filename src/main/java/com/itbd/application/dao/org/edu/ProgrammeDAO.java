package com.itbd.application.dao.org.edu;

import java.util.List;

import com.itbd.application.constants.ProgrammeTypeEnum;
import com.itbd.application.dao.AbstractEntity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "t_edu_programme")
public class ProgrammeDAO  extends AbstractEntity<Long>{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_programme_key", nullable = false, updatable = false)
    private Long id;

    @Column(name = "tx_name")
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

    @OneToMany(mappedBy = "programme", cascade = CascadeType.ALL)
    private List<CourseDAO> courses;
}