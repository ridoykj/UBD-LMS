package com.itbd.application.dto.user.person;

import java.time.LocalDateTime;

import com.itbd.application.dao.user.person.OccupationDAO;

public record OccupationDTO(
        Long id,
        Long idPersonKey,
        String records,
        String hasOccupation,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
        ) {
  public static OccupationDTO fromEntity(OccupationDAO occupation) {
        return new OccupationDTO(
                occupation.getId(),
                occupation.getPerson().getId(),
                occupation.getRecords(),
                occupation.getHasOccupation(),
                occupation.getCreatedAt(),
                occupation.getUpdatedAt());
    }
          public static void fromDTO(OccupationDTO occupationDTO, OccupationDAO occupationDAO) {
            occupationDAO.setId(occupationDTO.id());
            occupationDAO.setRecords(occupationDTO.records());
            occupationDAO.setHasOccupation(occupationDTO.hasOccupation());
            occupationDAO.setCreatedAt(occupationDTO.createdAt());
            occupationDAO.setUpdatedAt(occupationDTO.updatedAt());         
      }
}
