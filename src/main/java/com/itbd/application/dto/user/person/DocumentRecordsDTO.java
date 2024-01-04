package com.itbd.application.dto.user.person;

import java.time.LocalDateTime;

import com.itbd.application.dao.user.person.DocumentRecordsDAO;

public record DocumentRecordsDTO(
            Long id,
            Long PersonKey,
            String records,
            String educationRecords,
            String nationalRecords,
            String medicalRecords,
            String rewardRecords,
            LocalDateTime createdAt,
            LocalDateTime updatedAt) {
      public static DocumentRecordsDTO fromEntity(DocumentRecordsDAO document) {
            return new DocumentRecordsDTO(
                        document.getId(),
                        document.getPersonKey().getId(),
                        document.getRecords(),
                        document.getEducationRecords(),
                        document.getNationalRecords(),
                        document.getMedicalRecords(),
                        document.getRewardRecords(),
                        document.getCreatedAt(),
                        document.getUpdatedAt());
      }

      public static void fromDTO(DocumentRecordsDTO documentRecordsDTO, DocumentRecordsDAO documentRecordsDAO) {
            documentRecordsDAO.setId(documentRecordsDTO.id());
            documentRecordsDAO.setRecords(documentRecordsDTO.records());
            documentRecordsDAO.setEducationRecords(documentRecordsDTO.educationRecords());
            documentRecordsDAO.setNationalRecords(documentRecordsDTO.nationalRecords());
            documentRecordsDAO.setMedicalRecords(documentRecordsDTO.medicalRecords());
            documentRecordsDAO.setRewardRecords(documentRecordsDTO.rewardRecords());
            documentRecordsDAO.setCreatedAt(documentRecordsDTO.createdAt());
            documentRecordsDAO.setUpdatedAt(documentRecordsDTO.updatedAt());

      }
}
