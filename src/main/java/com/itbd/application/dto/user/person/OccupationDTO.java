package com.itbd.application.dto.user.person;

import com.itbd.application.dao.user.person.OccupationDao;
import org.springframework.data.annotation.Version;

import java.time.LocalDateTime;

public record OccupationDto(
        Long id,
        @Version Long version,
        Long idPersonKey,
        String records,
        String hasOccupation,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
    public static OccupationDto fromEntity(OccupationDao occupation) {
        return new OccupationDto(
                occupation.getId(),
                occupation.getVersion(),
                occupation.getPerson().getId(),
                occupation.getRecords(),
                occupation.getHasOccupation(),
                occupation.getCreatedAt(),
                occupation.getUpdatedAt());
    }

    public static void fromDTO(OccupationDto occupationDTO, OccupationDao occupationDAO) {
        occupationDAO.setId(occupationDTO.id());
        occupationDAO.setVersion(occupationDTO.version());
        occupationDAO.setRecords(occupationDTO.records());
        occupationDAO.setHasOccupation(occupationDTO.hasOccupation());
    }
}
