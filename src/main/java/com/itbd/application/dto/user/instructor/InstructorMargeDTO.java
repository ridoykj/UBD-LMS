package com.itbd.application.dto.user.instructor;

import com.itbd.application.constants.enums.BloodGroupsEnum;
import com.itbd.application.dao.user.InstructorDao;
import com.itbd.application.dao.user.person.*;
import jakarta.persistence.Id;

import java.time.LocalDateTime;

public record InstructorMargeDto(
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
        AddressDao address,
        ContactDao contact,
        DocumentRecordsDao record,
        MedicalDao medical,
        OccupationDao occupation,
        InstructorDao instructor
//        StudentDAO student

) {

    public static void fromDTO(InstructorMargeDto value, PersonDao person) {
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

        AddressDao address = value.address() != null ? value.address() : new AddressDao();
        ContactDao contact = value.contact() != null ? value.contact() : new ContactDao();
        DocumentRecordsDao documentRecords = value.record() != null ? value.record() : new DocumentRecordsDao();
        MedicalDao medical = value.medical() != null ? value.medical() : new MedicalDao();
        OccupationDao occupation = value.occupation() != null ? value.occupation() : new OccupationDao();
        InstructorDao instructor = value.instructor() != null ? value.instructor() : new InstructorDao();

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

    public static InstructorMargeDto fromEntity(PersonDao person) {
        AddressDao address = person.getAddress();
        ContactDao contact = person.getContact();
        DocumentRecordsDao records = person.getRecord();
        MedicalDao medical = person.getMedical();
        OccupationDao occupation = person.getOccupation();
        InstructorDao instructor = person.getInstructor();
        instructor.setReservations(null);

        person.setAddress(address);
        person.setContact(contact);
        person.setRecord(records);
        person.setMedical(medical);
        person.setOccupation(occupation);
        person.setInstructor(instructor);

        return new InstructorMargeDto(
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
