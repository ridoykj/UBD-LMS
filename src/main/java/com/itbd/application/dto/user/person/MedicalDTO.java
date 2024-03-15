package com.itbd.application.dto.user.person;

import com.itbd.application.constants.enums.GenderEnum;
import com.itbd.application.dao.user.person.MedicalDao;
import org.springframework.data.annotation.Version;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record MedicalDto(
        Long id,
        @Version Long version,
        BigDecimal weight,
        BigDecimal height,
        Long children,
        GenderEnum gender,
        LocalDateTime createdAt,
        LocalDateTime updatedAt) {
    public static MedicalDto fromEntity(MedicalDao medical) {
        return new MedicalDto(
                medical.getId(),
                medical.getVersion(),
                medical.getWeight(),
                medical.getHeight(),
                medical.getChildren(),
                medical.getGender(),
                medical.getCreatedAt(),
                medical.getUpdatedAt());
    }

    public static void fromDTO(MedicalDto medicalDTO, MedicalDao medicalDAO) {
        medicalDAO.setId(medicalDTO.id());
        medicalDAO.setVersion(medicalDTO.version());
        medicalDAO.setWeight(medicalDTO.weight());
        medicalDAO.setHeight(medicalDTO.height());
        medicalDAO.setChildren(medicalDTO.children());
        medicalDAO.setGender(medicalDTO.gender());
    }
}
