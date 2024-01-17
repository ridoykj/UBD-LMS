package com.itbd.application.dto.user.person;

import java.time.LocalDateTime;
import java.util.Optional;

import com.itbd.application.dao.user.InstructorDAO;
import com.itbd.application.dao.user.person.*;

import dev.hilla.Nullable;
import jakarta.validation.constraints.NotBlank;
import nonapi.io.github.classgraph.json.Id;

public record PersonDTO(
        @Id Long id,
        @Nullable Long version,
        @NotBlank String givenName,
        @NotBlank String additionalName,
        @NotBlank String familyName,
        String alternateName,
        LocalDateTime birthDate,
        LocalDateTime deathDate,
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
        InstructorDAO instructor,
        LocalDateTime createdAt,
        LocalDateTime updatedAt) {
    public static PersonDTO fromEntity(PersonDAO person) {
        return new PersonDTO(
                person.getId(),
                person.getVersion(),
                person.getGivenName(),
                person.getAdditionalName(),
                person.getFamilyName(),
                person.getAlternateName(),
                person.getBirthDate(),
                person.getDeathDate(),
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
                person.getInstructor(),
                person.getCreatedAt(),
                person.getUpdatedAt());
    }

    public static void fromDTO(PersonDTO personDTO, PersonDAO personDAO) {
        personDAO.setId(personDTO.id());
        personDAO.setVersion(personDTO.version());
        personDAO.setGivenName(personDTO.givenName());
        personDAO.setAdditionalName(personDTO.additionalName());
        personDAO.setFamilyName(personDTO.familyName());
        personDAO.setAlternateName(personDTO.alternateName());
        personDAO.setBirthDate(personDTO.birthDate());
        personDAO.setDeathDate(personDTO.deathDate());
        personDAO.setRefPerson(personDTO.refPerson());
        personDAO.setFollows(personDTO.follows());
        personDAO.setHasOccupation(personDTO.hasOccupation());
        personDAO.setHonorificPrefix(personDTO.honorificPrefix());
        personDAO.setHonorificSuffix(personDTO.honorificSuffix());
        personDAO.setKnowsLanguage(personDTO.knowsLanguage());
        personDAO.setNationality(personDTO.nationality());
        personDAO.setSponsor(personDTO.sponsor());
        personDAO.setDescription(personDTO.description());

        AddressDAO address = Optional.ofNullable(personDTO.address()).orElse(new AddressDAO());
        InstructorDAO instructor = Optional.ofNullable(personDTO.instructor()).orElse(new InstructorDAO());
//        ContactDAO contact = Optional.ofNullable(person.getContacts()).orElse(new ContactDAO());
//        DocumentRecordsDAO documentRecords = Optional.ofNullable(person.getRecordses())
//                .orElse(new DocumentRecordsDAO());
//        MedicalDAO medical = Optional.ofNullable(person.getMedicals()).orElse(new MedicalDAO());
//        OccupationDAO occupation = Optional.ofNullable(person.getOccupations()).orElse(new OccupationDAO());

        address.setPerson(personDAO);
        instructor.setPerson(personDAO);
       
        personDAO.setCreatedAt(personDTO.createdAt());
        personDAO.setUpdatedAt(personDTO.updatedAt());

        personDAO.setAddress(address);
        personDAO.setInstructor(instructor);
    }
}
