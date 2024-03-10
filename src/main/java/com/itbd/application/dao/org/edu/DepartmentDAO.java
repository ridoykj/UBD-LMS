package com.itbd.application.dao.org.edu;

import com.itbd.application.dao.AbstractEntity;
import com.itbd.application.dao.org.academic.OrganizationDao;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity(name = "t_edu_department")
@Getter
@Setter
public class DepartmentDao extends AbstractEntity<Long> {
    @Id
    @Column(name = "id_department_key", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Version
    @Nullable
    @Column(name = "id_department_ver", nullable = false)
    private Long version;

    @Column(name = "tx_name", unique = true)
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
    private List<ProgrammeDao> programmes;

    @ManyToOne
    @JoinColumn(name = "id_organization_key")
    private OrganizationDao organization;

}
