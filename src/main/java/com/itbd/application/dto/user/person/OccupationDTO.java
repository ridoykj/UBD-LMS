package com.itbd.application.dto.user.person;

import com.itbd.application.dao.user.person.OccupationDAO;
import org.springframework.data.annotation.Version;

import java.time.LocalDateTime;

public record OccupationDTO(
        Long id,
        @Version Long version,
        Long idPersonKey,
        String records,
        String hasOccupation,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
    public static OccupationDTO fromEntity(OccupationDAO occupation) {
        return new OccupationDTO(
                occupation.getId(),
                occupation.getVersion(),
                occupation.getPerson().getId(),
                occupation.getRecords(),
                occupation.getHasOccupation(),
                occupation.getCreatedAt(),
                occupation.getUpdatedAt());
    }

    public static void fromDTO(OccupationDTO occupationDTO, OccupationDAO occupationDAO) {
        occupationDAO.setId(occupationDTO.id());
        occupationDAO.setVersion(occupationDTO.version());
        occupationDAO.setRecords(occupationDTO.records());
        occupationDAO.setHasOccupation(occupationDTO.hasOccupation());
        occupationDAO.setCreatedAt(occupationDTO.createdAt());
        occupationDAO.setUpdatedAt(occupationDTO.updatedAt());
    }
}
