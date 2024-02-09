package com.itbd.application.dto.user.instructor;

import com.itbd.application.constants.enums.BloodGroupsEnum;
import com.itbd.application.dao.user.InstructorDAO;
import com.itbd.application.dao.user.person.*;
import jakarta.persistence.Id;

import java.time.LocalDateTime;

public record InstructorMargeDTO(
        @Id Long id,
        // TODO: from PersonDTO
        String givenName,
        String additionalName,
        String familyName,
        String alternateName,
        LocalDateTime birthDate,
        LocalDateTime deathDate,
        String fatherName,
        String motherName,
        BloodGroupsEnum bloodGroup,
        String refPerson,
        String follows,
        Boolean hasOccupation,
        String honorificPrefix,
        String honorificSuffix,
        String knowsLanguage,
        String nationality,
        String sponsor,
        String description,
        AddressDAO address,
        ContactDAO contact,
        DocumentRecordsDAO record,
        MedicalDAO medical,
        OccupationDAO occupation,
        InstructorDAO instructor
//        StudentDAO student

) {

    public static void fromDTO(InstructorMargeDTO value, PersonDAO person) {
        person.setId(value.id());
        person.setGivenName(value.givenName());
        person.setAdditionalName(value.additionalName());
        person.setFamilyName(value.familyName());
        person.setAlternateName(value.alternateName());
        person.setBirthDate(value.birthDate());
        person.setDeathDate(value.deathDate());
        person.setFatherName(value.fatherName());
        person.setMotherName(value.motherName());
        person.setBloodGroup(value.bloodGroup());
        person.setRefPerson(value.refPerson());
        person.setFollows(value.follows());
        person.setHasOccupation(value.hasOccupation());
        person.setHonorificPrefix(value.honorificPrefix());
        person.setHonorificSuffix(value.honorificSuffix());
        person.setKnowsLanguage(value.knowsLanguage());
        person.setNationality(value.nationality());
        person.setSponsor(value.sponsor());
        person.setDescription(value.description());

        AddressDAO address = value.address() != null ? value.address() : new AddressDAO();
        ContactDAO contact = value.contact() != null ? value.contact() : new ContactDAO();
        DocumentRecordsDAO documentRecords = value.record() != null ? value.record() : new DocumentRecordsDAO();
        MedicalDAO medical = value.medical() != null ? value.medical() : new MedicalDAO();
        OccupationDAO occupation = value.occupation() != null ? value.occupation() : new OccupationDAO();
        InstructorDAO instructor = value.instructor() != null ? value.instructor() : new InstructorDAO();

        address.setPerson(person);
        contact.setPerson(person);
        documentRecords.setPerson(person);
        medical.setPerson(person);
        occupation.setPerson(person);
        instructor.setPerson(person);

        person.setAddress(address);
        person.setContact(contact);
        person.setRecord(documentRecords);
        person.setMedical(medical);
        person.setOccupation(occupation);
        person.setInstructor(instructor);
    }

    public static InstructorMargeDTO fromEntity(PersonDAO person) {
        AddressDAO address = person.getAddress();
        ContactDAO contact = person.getContact();
        DocumentRecordsDAO records = person.getRecord();
        MedicalDAO medical = person.getMedical();
        OccupationDAO occupation = person.getOccupation();
        InstructorDAO instructor = person.getInstructor();
        instructor.setReservations(null);

        person.setAddress(address);
        person.setContact(contact);
        person.setRecord(records);
        person.setMedical(medical);
        person.setOccupation(occupation);
        person.setInstructor(instructor);

        return new InstructorMargeDTO(
                person.getId(),
                person.getGivenName(),
                person.getAdditionalName(),
                person.getFamilyName(),
                person.getAlternateName(),
                person.getBirthDate(),
                person.getDeathDate(),
                person.getFatherName(),
                person.getMotherName(),
                person.getBloodGroup(),
                person.getRefPerson(),
                person.getFollows(),
                person.getHasOccupation(),
                person.getHonorificPrefix(),
                person.getHonorificSuffix(),
                person.getKnowsLanguage(),
                person.getNationality(),
                person.getSponsor(),
                person.getDescription(),

                person.getAddress(),
                person.getContact(),
                person.getRecord(),
                person.getMedical(),
                person.getOccupation(),
                person.getInstructor()
        );
    }
}
