package com.itbd.application.dto.org.edu;

import com.itbd.application.constants.enums.ProgrammeTypeEnum;
import com.itbd.application.dao.org.edu.BatchDao;
import com.itbd.application.dao.org.edu.DepartmentDao;
import com.itbd.application.dao.org.edu.ProgrammeDao;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.annotation.Version;

import java.util.List;

public record ProgrammeDto(
        Long id,
        @Version Long version,
        @NotNull @NotEmpty String name,
        ProgrammeTypeEnum studyLevel,
        String code,
        String description,
        String status,
        @NotNull DepartmentDao department,
        List<BatchDao> batches) {

    public static ProgrammeDto fromEntity(ProgrammeDao programee) {
        return new ProgrammeDto(
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

    public static void fromDTO(ProgrammeDto programeeDTO, ProgrammeDao programeeDAO) {
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
