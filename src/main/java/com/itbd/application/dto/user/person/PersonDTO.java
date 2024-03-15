package com.itbd.application.dto.user.person;

import com.itbd.application.dao.user.InstructorDao;
import com.itbd.application.dao.user.person.AddressDao;
import com.itbd.application.dao.user.person.PersonDao;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import nonapi.io.github.classgraph.json.Id;
import org.springframework.data.annotation.Version;

import java.time.LocalDateTime;
import java.util.Optional;

public record PersonDto(
        @Id Long id,
        @Version Long version,
        @NotNull @NotEmpty String givenName,
        @NotNull @NotEmpty String additionalName,
        @NotNull @NotEmpty String familyName,
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
        AddressDao address,
        InstructorDao instructor,
        LocalDateTime createdAt,
        LocalDateTime updatedAt) {
    public static PersonDto fromEntity(PersonDao person) {
        return new PersonDto(
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

    public static void fromDTO(PersonDto personDTO, PersonDao personDAO) {
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

        AddressDao address = Optional.ofNullable(personDTO.address()).orElse(new AddressDao());
        InstructorDao instructor = Optional.ofNullable(personDTO.instructor()).orElse(new InstructorDao());
//        ContactDAO contact = Optional.ofNullable(person.getContacts()).orElse(new ContactDAO());
//        DocumentRecordsDAO documentRecords = Optional.ofNullable(person.getRecordses())
//                .orElse(new DocumentRecordsDAO());
//        MedicalDAO medical = Optional.ofNullable(person.getMedicals()).orElse(new MedicalDAO());
//        OccupationDAO occupation = Optional.ofNullable(person.getOccupations()).orElse(new OccupationDAO());

        address.setPerson(personDAO);
        instructor.setPerson(personDAO);

        personDAO.setAddress(address);
        personDAO.setInstructor(instructor);
    }
}
