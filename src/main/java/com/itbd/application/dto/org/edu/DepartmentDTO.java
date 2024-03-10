package com.itbd.application.dto.org.edu;

import com.itbd.application.dao.org.academic.OrganizationDao;
import com.itbd.application.dao.org.edu.DepartmentDao;
import com.itbd.application.dao.org.edu.ProgrammeDao;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.annotation.Version;

import java.util.List;

public record DepartmentDto(
        Long id,
        @Version Long version,
        @NotNull @NotEmpty String name,
        String code,
        String description,
        String status,
        String headOfDepartment,
        List<ProgrammeDao> programmes,
        @NotNull OrganizationDao organization) {

    public static DepartmentDto fromEntity(DepartmentDao department) {
        return new DepartmentDto(
                department.getId(),
                department.getVersion(),
                department.getName(),
                department.getCode(),
                department.getDescription(),
                department.getStatus(),
                department.getHeadOfDepartment(),
                department.getProgrammes(),
                department.getOrganization());
    }

    public static void fromDTO(DepartmentDto departmentDTO, DepartmentDao departmentDAO) {
        departmentDAO.setId(departmentDTO.id());
        departmentDAO.setVersion(departmentDTO.version());
        departmentDAO.setName(departmentDTO.name());
        departmentDAO.setCode(departmentDTO.code());
        departmentDAO.setDescription(departmentDTO.description());
        departmentDAO.setStatus(departmentDTO.status());
        departmentDAO.setHeadOfDepartment(departmentDTO.headOfDepartment());
        departmentDAO.setProgrammes(departmentDTO.programmes());
        departmentDAO.setOrganization(departmentDTO.organization());
    }

}
