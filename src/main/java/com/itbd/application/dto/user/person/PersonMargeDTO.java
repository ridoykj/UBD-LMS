package com.itbd.application.dto.user.person;

import com.itbd.application.constants.enums.BloodGroupsEnum;
import com.itbd.application.dao.user.person.*;
import jakarta.persistence.Id;
import org.springframework.data.annotation.Version;

import java.time.LocalDateTime;
import java.util.Optional;

public record PersonMargeDto(
        @Id Long id,
        @Version Long version,
        // TODO: from PersonDTO
        String givenName,
        String additionalName,
        String familyName,
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
        ContactDao contact,
        DocumentRecordsDao record,
        MedicalDao medical,
        OccupationDao occupation
) {

    public static void fromDTO(PersonMargeDto value, PersonDao person) {
        person.setId(value.id());
        person.setVersion(value.version());
        person.setGivenName(value.givenName());
        person.setAdditionalName(value.additionalName());
        person.setFamilyName(value.familyName());
        person.setAlternateName(value.alternateName());
        person.setBirthDate(value.birthDate());
        person.setDeathDate(value.deathDate());
        person.setRefPerson(value.refPerson());
        person.setFollows(value.follows());
        person.setHasOccupation(value.hasOccupation());
        person.setHonorificPrefix(value.honorificPrefix());
        person.setHonorificSuffix(value.honorificSuffix());
        person.setKnowsLanguage(value.knowsLanguage());
        person.setNationality(value.nationality());
        person.setSponsor(value.sponsor());
        person.setDescription(value.description());

        AddressDao address = Optional.ofNullable(person.getAddress()).orElse(new AddressDao());
        ContactDao contact = Optional.ofNullable(person.getContact()).orElse(new ContactDao());
        DocumentRecordsDao documentRecords = Optional.ofNullable(person.getRecord())
                .orElse(new DocumentRecordsDao());
        MedicalDao medical = Optional.ofNullable(person.getMedical()).orElse(new MedicalDao());
        OccupationDao occupation = Optional.ofNullable(person.getOccupation()).orElse(new OccupationDao());

        address.setPerson(person);
        contact.setPerson(person);
        documentRecords.setPerson(person);
        medical.setPerson(person);
        occupation.setPerson(person);

        person.setAddress(address);
        person.setContact(contact);
        person.setRecord(documentRecords);
        person.setMedical(medical);
        person.setOccupation(occupation);
    }

    public static PersonMargeDto fromEntity(PersonDao person) {
        AddressDao address = person.getAddress();
        ContactDao contact = person.getContact();
        DocumentRecordsDao record = person.getRecord();
        MedicalDao medical = person.getMedical();
        OccupationDao occupation = person.getOccupation();
        DocumentRecordsDao documentRecords = Optional.ofNullable(person.getRecord())
                .orElse(new DocumentRecordsDao());

        person.setAddress(address);
        person.setContact(contact);
        person.setRecord(record);
        person.setMedical(medical);
        person.setOccupation(occupation);
        person.setRecord(documentRecords);


        return new PersonMargeDto(
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

                address,
                contact,
                record,
                medical,
                occupation
        );
    }
}
