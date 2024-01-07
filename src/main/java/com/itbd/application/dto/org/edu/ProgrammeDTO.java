package com.itbd.application.dto.org.edu;

import java.util.List;

import com.itbd.application.dao.org.edu.BatchDAO;
import com.itbd.application.dao.org.edu.CourseDAO;
import com.itbd.application.dao.org.edu.DepartmentDAO;
import com.itbd.application.dao.org.edu.ProgrammeDAO;

public record ProgrammeDTO(
        Long id,
        String name,
        String description,
        String status,
        DepartmentDAO department,
        List<BatchDAO> batches,
        List<CourseDAO> courses) {

    public static ProgrammeDTO fromEntity(ProgrammeDAO programee) {
        return new ProgrammeDTO(
                programee.getId(),
                programee.getName(),
                programee.getDescription(),
                programee.getStatus(),
                programee.getDepartment(),
                programee.getBatches(),
                programee.getCourses());
    }

    public static void fromDTO(ProgrammeDTO programeeDTO, ProgrammeDAO programeeDAO) {
        programeeDAO.setId(programeeDTO.id());
        programeeDAO.setName(programeeDTO.name());
        programeeDAO.setDescription(programeeDTO.description());
        programeeDAO.setStatus(programeeDTO.status());
        programeeDAO.setDepartment(programeeDTO.department());
        programeeDAO.setBatches(programeeDTO.batches());
        programeeDAO.setCourses(programeeDTO.courses());
    }

}
