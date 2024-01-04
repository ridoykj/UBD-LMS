package com.itbd.application.dto.user.person;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.itbd.application.constants.GenderEnum;
import com.itbd.application.dao.user.person.MedicalDAO;

public record MedicalDTO(
            Long id,
            BigDecimal weight,
            BigDecimal height,
            Long children,
            GenderEnum gender,
            LocalDateTime createdAt,
            LocalDateTime updatedAt) {
      public static MedicalDTO fromEntity(MedicalDAO medical) {
            return new MedicalDTO(
                        medical.getId(),
                        medical.getWeight(),
                        medical.getHeight(),
                        medical.getChildren(),
                        medical.getGender(),
                        medical.getCreatedAt(),
                        medical.getUpdatedAt());
      }

      public static void fromDTO(MedicalDTO medicalDTO, MedicalDAO medicalDAO) {
            medicalDAO.setId(medicalDTO.id());
            medicalDAO.setWeight(medicalDTO.weight());
            medicalDAO.setHeight(medicalDTO.height());
            medicalDAO.setChildren(medicalDTO.children());
            medicalDAO.setGender(medicalDTO.gender());
            medicalDAO.setCreatedAt(medicalDTO.createdAt());
            medicalDAO.setUpdatedAt(medicalDTO.updatedAt());
      }
}
