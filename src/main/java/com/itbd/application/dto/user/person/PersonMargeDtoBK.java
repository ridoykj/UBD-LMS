//package com.itbd.application.dto.user.person;
//
//import com.itbd.application.constants.enums.GenderEnum;
//import com.itbd.application.dao.user.person.*;
//import jakarta.persistence.Id;
//import org.springframework.data.annotation.Version;
//
//import java.math.BigDecimal;
//import java.time.LocalDateTime;
//import java.util.Optional;
//
//public record PersonMargeDtoBK(
//        @Id Long id,
//        @Version Long version,
//        // TODO: from PersonDTO
//        String givenName,
//        String additionalName,
//        String familyName,
//        String alternateName,
//        LocalDateTime birthDate,
//        LocalDateTime deathDate,
//        String refPerson,
//        String follows,
//        Boolean hasOccupation,
//        String honorificPrefix,
//        String honorificSuffix,
//        String knowsLanguage,
//        String nationality,
//        String sponsor,
//        String description,
//
//        // TODO: from AddressDTO
//        String birthPlace,
//        String deathPlace,
//        String homeLocation,
//        String presentAddress,
//        String permanentAddress,
//
//        // TODO: from ContactDTO
//        String email,
//        String mobile,
//        String telephone,
//        String faxNumber,
//
//        // TODO: from DocumentRecordsDTO
//        String records,
//        String educationRecords,
//        String nationalRecords,
//        String medicalRecords,
//        String rewardRecords,
//
//        // TODO: from MedicalDTO
//        BigDecimal weight,
//        BigDecimal height,
//        Long children,
//        GenderEnum gender,
//
//        // TODO: from OccupationDTO
//        String occupationRecords) {
//
//    public static void fromDTO(PersonMargeDtoBK value, PersonDao person) {
//        person.setId(value.id());
//        person.setVersion(value.version());
//        person.setGivenName(value.givenName());
//        person.setAdditionalName(value.additionalName());
//        person.setFamilyName(value.familyName());
//        person.setAlternateName(value.alternateName());
//        person.setBirthDate(value.birthDate());
//        person.setDeathDate(value.deathDate());
//        person.setRefPerson(value.refPerson());
//        person.setFollows(value.follows());
//        person.setHasOccupation(value.hasOccupation());
//        person.setHonorificPrefix(value.honorificPrefix());
//        person.setHonorificSuffix(value.honorificSuffix());
//        person.setKnowsLanguage(value.knowsLanguage());
//        person.setNationality(value.nationality());
//        person.setSponsor(value.sponsor());
//        person.setDescription(value.description());
//
//        AddressDao address = Optional.ofNullable(person.getAddress()).orElse(new AddressDao());
//        ContactDao contact = Optional.ofNullable(person.getContact()).orElse(new ContactDao());
//        DocumentRecordsDao documentRecords = Optional.ofNullable(person.getRecord())
//                .orElse(new DocumentRecordsDao());
//        MedicalDao medical = Optional.ofNullable(person.getMedical()).orElse(new MedicalDao());
//        OccupationDao occupation = Optional.ofNullable(person.getOccupation()).orElse(new OccupationDao());
//
//        address.setBirthPlace(value.birthPlace());
//        address.setDeathPlace(value.deathPlace());
//        address.setHomeLocation(value.homeLocation());
//        address.setPresentAddress(value.presentAddress());
//        address.setPermanentAddress(value.permanentAddress());
//        address.setPerson(person);
//
//        contact.setEmail(value.email());
//        contact.setMobile(value.mobile());
//        contact.setTelephone(value.telephone());
//        contact.setFaxNumber(value.faxNumber());
//        contact.setPerson(person);
//
//        documentRecords.setRecords(value.records());
//        documentRecords.setEducationRecords(value.educationRecords());
//        documentRecords.setNationalRecords(value.nationalRecords());
//        documentRecords.setMedicalRecords(value.medicalRecords());
//        documentRecords.setEmploymentRecords(value.rewardRecords());
//        documentRecords.setPerson(person);
//
//        medical.setWeight(value.weight());
//        medical.setHeight(value.height());
//        medical.setChildren(value.children());
//        medical.setGender(value.gender());
//        medical.setPerson(person);
//
//        occupation.setRecords(value.occupationRecords());
//        occupation.setPerson(person);
//
//        person.setAddress(address);
//        person.setContact(contact);
//        person.setRecord(documentRecords);
//        person.setMedical(medical);
//        person.setOccupation(occupation);
//    }
//
//    public static PersonMargeDtoBK fromEntity(PersonDao person) {
//        AddressDao address = person.getAddress();
//        ContactDao contact = person.getContact();
//        DocumentRecordsDao record = person.getRecord();
//        MedicalDao medical = person.getMedical();
//        OccupationDao occupation = person.getOccupation();
//        DocumentRecordsDao documentRecords = Optional.ofNullable(person.getRecord())
//                .orElse(new DocumentRecordsDao());
//
//        person.setAddress(address);
//        person.setContact(contact);
//        person.setRecord(record);
//        person.setMedical(medical);
//        person.setOccupation(occupation);
//        person.setRecord(documentRecords);
//
//
//        return new PersonMargeDtoBK(
//                person.getId(),
//                person.getVersion(),
//                person.getGivenName(),
//                person.getAdditionalName(),
//                person.getFamilyName(),
//                person.getAlternateName(),
//                person.getBirthDate(),
//                person.getDeathDate(),
//                person.getRefPerson(),
//                person.getFollows(),
//                person.getHasOccupation(),
//                person.getHonorificPrefix(),
//                person.getHonorificSuffix(),
//                person.getKnowsLanguage(),
//                person.getNationality(),
//                person.getSponsor(),
//                person.getDescription(),
//
//                address.getBirthPlace(),
//                address.getDeathPlace(),
//                address.getHomeLocation(),
//                address.getPresentAddress(),
//                address.getPermanentAddress(),
//
//                contact.getEmail(),
//                contact.getMobile(),
//                contact.getTelephone(),
//                contact.getFaxNumber(),
//
//                documentRecords.getRecords(),
//                documentRecords.getEducationRecords(),
//                documentRecords.getNationalRecords(),
//                documentRecords.getMedicalRecords(),
//                documentRecords.getEmploymentRecords(),
//
//                medical.getWeight(),
//                medical.getHeight(),
//                medical.getChildren(),
//                medical.getGender(),
//
//                occupation.getRecords());
//    }
//}
