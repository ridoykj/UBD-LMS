package com.itbd.application.dto.user.person;

import com.itbd.application.dao.user.person.DocumentRecordsDAO;
import org.springframework.data.annotation.Version;

import java.time.LocalDateTime;

public record DocumentRecordsDTO(
        Long id,
        @Version Long version,
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
                document.getVersion(),
                document.getPerson().getId(),
                document.getRecords(),
                document.getEducationRecords(),
                document.getNationalRecords(),
                document.getMedicalRecords(),
                document.getEmploymentRecords(),
                document.getCreatedAt(),
                document.getUpdatedAt());
    }

    public static void fromDTO(DocumentRecordsDTO documentRecordsDTO, DocumentRecordsDAO documentRecordsDAO) {
        documentRecordsDAO.setId(documentRecordsDTO.id());
        documentRecordsDAO.setVersion(documentRecordsDTO.version());
        documentRecordsDAO.setRecords(documentRecordsDTO.records());
        documentRecordsDAO.setEducationRecords(documentRecordsDTO.educationRecords());
        documentRecordsDAO.setNationalRecords(documentRecordsDTO.nationalRecords());
        documentRecordsDAO.setMedicalRecords(documentRecordsDTO.medicalRecords());
        documentRecordsDAO.setEmploymentRecords(documentRecordsDTO.rewardRecords());
        documentRecordsDAO.setCreatedAt(documentRecordsDTO.createdAt());
        documentRecordsDAO.setUpdatedAt(documentRecordsDTO.updatedAt());

    }
}
