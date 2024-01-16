package com.itbd.application.dao.org.edu;

import java.util.List;

import com.itbd.application.dao.AbstractEntity;
import com.itbd.application.dao.org.academic.OrganizationDAO;

import jakarta.persistence.CascadeType;
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

@Entity(name = "t_edu_department")
@Getter
@Setter
public class DepartmentDAO  extends AbstractEntity<Long>{
    @Id
    @Column(name = "id_department_key", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tx_name")
    private String name;

    @Column(name = "tx_code")
    private String code;

    @Column(name = "tx_description")
    private String description;

    @Column(name = "tx_status")
    private String status;

    @Column(name = "tx_head_of_department")
    private String headOfDepartment;

    @OneToMany(mappedBy = "department", cascade = CascadeType.ALL)
    private List<ProgrammeDAO> programmes;

    @ManyToOne
    @JoinColumn(name = "id_organization_key")
    private OrganizationDAO organization;

}
