package com.itbd.application.dto.user.instructor;

import com.itbd.application.constants.BloodGroupsEnum;
import com.itbd.application.dao.user.InstructorDAO;
import com.itbd.application.dao.user.person.*;
import jakarta.persistence.Id;

import java.time.LocalDateTime;
import java.util.Optional;

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
        DocumentRecordsDAO records,
        MedicalDAO medicals,
        OccupationDAO occupations,
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

        AddressDAO address = Optional.ofNullable(person.getAddresses()).orElse(new AddressDAO());
        ContactDAO contact = Optional.ofNullable(person.getContacts()).orElse(new ContactDAO());
        DocumentRecordsDAO documentRecords = Optional.ofNullable(person.getRecordses()).orElse(new DocumentRecordsDAO());
        MedicalDAO medical = Optional.ofNullable(person.getMedicals()).orElse(new MedicalDAO());
        OccupationDAO occupation = Optional.ofNullable(person.getOccupations()).orElse(new OccupationDAO());
        InstructorDAO instructor = Optional.ofNullable(person.getInstructor()).orElse(new InstructorDAO());

        address.setPersonKey(person);
        contact.setPersonKey(person);
        documentRecords.setPersonKey(person);
        medical.setPersonKey(person);
        occupation.setPersonKey(person);
        instructor.setPersonKey(person);

        person.setAddresses(address);
        person.setContacts(contact);
        person.setRecordses(documentRecords);
        person.setMedicals(medical);
        person.setOccupations(occupation);
        person.setInstructor(instructor);
    }

    public static InstructorMargeDTO fromEntity(PersonDAO person) {
        AddressDAO address = person.getAddresses();
        ContactDAO contact = person.getContacts();
        DocumentRecordsDAO records = person.getRecordses();
        MedicalDAO medical = person.getMedicals();
        OccupationDAO occupation = person.getOccupations();
        InstructorDAO instructor = person.getInstructor();
        instructor.setReservations(null);

        person.setAddresses(address);
        person.setContacts(contact);
        person.setRecordses(records);
        person.setMedicals(medical);
        person.setOccupations(occupation);
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

                person.getAddresses(),
                person.getContacts(),
                person.getRecordses(),
                person.getMedicals(),
                person.getOccupations(),
                person.getInstructor()
                );
    }
}
