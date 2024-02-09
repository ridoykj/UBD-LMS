package com.itbd.application.dto.org.edu;

import com.itbd.application.constants.enums.ProgrammeTypeEnum;
import com.itbd.application.dao.org.edu.BatchDAO;
import com.itbd.application.dao.org.edu.DepartmentDAO;
import com.itbd.application.dao.org.edu.ProgrammeDAO;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.annotation.Version;

import java.util.List;

public record ProgrammeDTO(
        Long id,
        @Version Long version,
        @NotNull @NotEmpty String name,
        ProgrammeTypeEnum studyLevel,
        String code,
        String description,
        String status,
        @NotNull DepartmentDAO department,
        List<BatchDAO> batches) {

    public static ProgrammeDTO fromEntity(ProgrammeDAO programee) {
        return new ProgrammeDTO(
                programee.getId(),
                programee.getVersion(),
                programee.getName(),
                programee.getStudyLevel(),
                programee.getCode(),
                programee.getDescription(),
                programee.getStatus(),
                programee.getDepartment(),
                programee.getBatches());
    }

    public static void fromDTO(ProgrammeDTO programeeDTO, ProgrammeDAO programeeDAO) {
        programeeDAO.setId(programeeDTO.id());
        programeeDAO.setVersion(programeeDTO.version());
        programeeDAO.setName(programeeDTO.name());
        programeeDAO.setStudyLevel(programeeDTO.studyLevel());
        programeeDAO.setCode(programeeDTO.code());

        programeeDAO.setStatus(programeeDTO.status());
        programeeDAO.setDescription(programeeDTO.description());
        programeeDAO.setDepartment(programeeDTO.department());
        programeeDAO.setBatches(programeeDTO.batches());
    }

}
