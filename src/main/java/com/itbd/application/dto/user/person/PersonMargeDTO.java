package com.itbd.application.dto.user.person;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;

import com.itbd.application.constants.GenderEnum;
import com.itbd.application.dao.user.person.AddressDAO;
import com.itbd.application.dao.user.person.ContactDAO;
import com.itbd.application.dao.user.person.DocumentRecordsDAO;
import com.itbd.application.dao.user.person.MedicalDAO;
import com.itbd.application.dao.user.person.OccupationDAO;
import com.itbd.application.dao.user.person.PersonDAO;

import jakarta.persistence.Id;

public record PersonMargeDTO(
        @Id Long id,
        // TODO: from PersonDTO
        String givenName,
        String additionalName,
        String familyName,
        String alternateName,
        LocalDate birthDate,
        LocalDate deathDate,
        String refPerson,
        String follows,
        Boolean hasOccupation,
        String honorificPrefix,
        String honorificSuffix,
        String knowsLanguage,
        String nationality,
        String sponsor,
        String description,

        // TODO: from AddressDTO
        String birthPlace,
        String deathPlace,
        String homeLocation,
        String presentAddress,
        String permanentAddress,

        // TODO: from ContactDTO
        String email,
        String phone,
        String telephone,
        String faxNumber,

        // TODO: from DocumentRecordsDTO
        String records,
        String educationRecords,
        String nationalRecords,
        String medicalRecords,
        String rewardRecords,

        // TODO: from MedicalDTO
        BigDecimal weight,
        BigDecimal height,
        Long children,
        GenderEnum gender,

        // TODO: from OccupationDTO
        String occupationRecords) {

    public static void fromDTO(PersonMargeDTO value, PersonDAO person) {
        person.setId(value.id());
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

        AddressDAO address = Optional.ofNullable(person.getAddresses()).orElse(new AddressDAO());
        ContactDAO contact = Optional.ofNullable(person.getContacts()).orElse(new ContactDAO());
        DocumentRecordsDAO documentRecords = Optional.ofNullable(person.getRecordses())
                .orElse(new DocumentRecordsDAO());
        MedicalDAO medical = Optional.ofNullable(person.getMedicals()).orElse(new MedicalDAO());
        OccupationDAO occupation = Optional.ofNullable(person.getOccupations()).orElse(new OccupationDAO());

        address.setBirthPlace(value.birthPlace());
        address.setDeathPlace(value.deathPlace());
        address.setHomeLocation(value.homeLocation());
        address.setPresentAddress(value.presentAddress());
        address.setPermanentAddress(value.permanentAddress());
        address.setPersonKey(person);

        contact.setEmail(value.email());
        contact.setPhone(value.phone());
        contact.setTelephone(value.telephone());
        contact.setFaxNumber(value.faxNumber());
        contact.setPersonKey(person);

        documentRecords.setRecords(value.records());
        documentRecords.setEducationRecords(value.educationRecords());
        documentRecords.setNationalRecords(value.nationalRecords());
        documentRecords.setMedicalRecords(value.medicalRecords());
        documentRecords.setRewardRecords(value.rewardRecords());
        documentRecords.setPersonKey(person);

        medical.setWeight(value.weight());
        medical.setHeight(value.height());
        medical.setChildren(value.children());
        medical.setGender(value.gender());
        medical.setPersonKey(person);

        occupation.setRecords(value.occupationRecords());
        occupation.setPersonKey(person);

        person.setAddresses(address);
        person.setContacts(contact);
        person.setRecordses(documentRecords);
        person.setMedicals(medical);
        person.setOccupations(occupation);
    }

    public static PersonMargeDTO fromEntity(PersonDAO person) {
        AddressDAO address = Optional.ofNullable(person.getAddresses()).orElse(new AddressDAO());
        ContactDAO contact = Optional.ofNullable(person.getContacts()).orElse(new ContactDAO());
        DocumentRecordsDAO documentRecords = Optional.ofNullable(person.getRecordses())
                .orElse(new DocumentRecordsDAO());
        MedicalDAO medical = Optional.ofNullable(person.getMedicals()).orElse(new MedicalDAO());
        OccupationDAO occupation = Optional.ofNullable(person.getOccupations()).orElse(new OccupationDAO());

        return new PersonMargeDTO(
                person.getId(),
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

                address.getBirthPlace(),
                address.getDeathPlace(),
                address.getHomeLocation(),
                address.getPresentAddress(),
                address.getPermanentAddress(),

                contact.getEmail(),
                contact.getPhone(),
                contact.getTelephone(),
                contact.getFaxNumber(),

                documentRecords.getRecords(),
                documentRecords.getEducationRecords(),
                documentRecords.getNationalRecords(),
                documentRecords.getMedicalRecords(),
                documentRecords.getRewardRecords(),

                medical.getWeight(),
                medical.getHeight(),
                medical.getChildren(),
                medical.getGender(),

                occupation.getRecords());
    }
}
