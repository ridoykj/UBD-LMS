package com.itbd.application.dto.org.edu;

import java.util.List;

import com.itbd.application.dao.org.academic.OrganizationDAO;
import com.itbd.application.dao.org.edu.DepartmentDAO;
import com.itbd.application.dao.org.edu.ProgrammeDAO;

public record DepartmentDTO(
                Long id,
                String name,
                String code,
                String description,
                String status,
                String headOfDepartment,
                List<ProgrammeDAO> programmes,
                OrganizationDAO organization) {

        public static DepartmentDTO fromEntity(DepartmentDAO department) {
                return new DepartmentDTO(
                                department.getId(),
                                department.getName(),
                                department.getCode(),
                                department.getDescription(),
                                department.getStatus(),
                                department.getHeadOfDepartment(),
                                department.getProgrammes(),
                                department.getOrganization());
        }

        public static void fromDTO(DepartmentDTO departmentDTO, DepartmentDAO departmentDAO) {
                departmentDAO.setId(departmentDTO.id());
                departmentDAO.setName(departmentDTO.name());
                departmentDAO.setCode(departmentDTO.code());
                departmentDAO.setDescription(departmentDTO.description());
                departmentDAO.setStatus(departmentDTO.status());
                departmentDAO.setHeadOfDepartment(departmentDTO.headOfDepartment());
                departmentDAO.setProgrammes(departmentDTO.programmes());
                departmentDAO.setOrganization(departmentDTO.organization());
        }

}
