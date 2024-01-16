package com.itbd.application.dto.user.instructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Optional;

import com.itbd.application.constants.BloodGroupsEnum;
import com.itbd.application.constants.GenderEnum;
import com.itbd.application.dao.user.InstructorDAO;
import com.itbd.application.dao.user.person.AddressDAO;
import com.itbd.application.dao.user.person.ContactDAO;
import com.itbd.application.dao.user.person.DocumentRecordsDAO;
import com.itbd.application.dao.user.person.MedicalDAO;
import com.itbd.application.dao.user.person.OccupationDAO;
import com.itbd.application.dao.user.person.PersonDAO;

import jakarta.persistence.Id;

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

                // TODO: from AddressDTO
                String birthPlace,
                String deathPlace,
                String homeLocation,
                String presentAddress,
                String permanentAddress,

                // TODO: from ContactDTO
                String email,
                String mobile,
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
                String occupationRecords,

                // TODO: from InstructorDTO
                String name,
                String instEmail,
                String instDescription,
                String designation,
                String qualification) {

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
                DocumentRecordsDAO documentRecords = Optional.ofNullable(person.getRecordses())
                                .orElse(new DocumentRecordsDAO());
                MedicalDAO medical = Optional.ofNullable(person.getMedicals()).orElse(new MedicalDAO());
                OccupationDAO occupation = Optional.ofNullable(person.getOccupations()).orElse(new OccupationDAO());

                InstructorDAO instructor = Optional.ofNullable(person.getInstructor()).orElse(new InstructorDAO());

                address.setBirthPlace(value.birthPlace());
                address.setDeathPlace(value.deathPlace());
                address.setHomeLocation(value.homeLocation());
                address.setPresentAddress(value.presentAddress());
                address.setPermanentAddress(value.permanentAddress());
                address.setPersonKey(person);

                contact.setEmail(value.email());
                contact.setMobile(value.mobile());
                contact.setTelephone(value.telephone());
                contact.setFaxNumber(value.faxNumber());
                contact.setPersonKey(person);

                documentRecords.setRecords(value.records());
                documentRecords.setEducationRecords(value.educationRecords());
                documentRecords.setNationalRecords(value.nationalRecords());
                documentRecords.setMedicalRecords(value.medicalRecords());
                documentRecords.setEmploymentRecords(value.rewardRecords());
                documentRecords.setPersonKey(person);

                medical.setWeight(value.weight());
                medical.setHeight(value.height());
                medical.setChildren(value.children());
                medical.setGender(value.gender());
                medical.setPersonKey(person);

                occupation.setRecords(value.occupationRecords());
                occupation.setPersonKey(person);

                instructor.setName(value.name());
                instructor.setEmail(value.instEmail());
                instructor.setDescription(value.instDescription());
                instructor.setDesignation(value.designation());
                instructor.setQualification(value.qualification());
                instructor.setPersonKey(person);

                person.setAddresses(address);
                person.setContacts(contact);
                person.setRecordses(documentRecords);
                person.setMedicals(medical);
                person.setOccupations(occupation);
                person.setInstructor(instructor);
        }

        public static InstructorMargeDTO fromEntity(PersonDAO person) {
                AddressDAO address = Optional.ofNullable(person.getAddresses()).orElse(new AddressDAO());
                ContactDAO contact = Optional.ofNullable(person.getContacts()).orElse(new ContactDAO());
                DocumentRecordsDAO documentRecords = Optional.ofNullable(person.getRecordses())
                                .orElse(new DocumentRecordsDAO());
                MedicalDAO medical = Optional.ofNullable(person.getMedicals()).orElse(new MedicalDAO());
                OccupationDAO occupation = Optional.ofNullable(person.getOccupations()).orElse(new OccupationDAO());

                InstructorDAO instructor = Optional.ofNullable(person.getInstructor()).orElse(new InstructorDAO());
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

                                address.getBirthPlace(),
                                address.getDeathPlace(),
                                address.getHomeLocation(),
                                address.getPresentAddress(),
                                address.getPermanentAddress(),

                                contact.getEmail(),
                                contact.getMobile(),
                                contact.getTelephone(),
                                contact.getFaxNumber(),

                                documentRecords.getRecords(),
                                documentRecords.getEducationRecords(),
                                documentRecords.getNationalRecords(),
                                documentRecords.getMedicalRecords(),
                                documentRecords.getEmploymentRecords(),

                                medical.getWeight(),
                                medical.getHeight(),
                                medical.getChildren(),
                                medical.getGender(),

                                occupation.getRecords(),

                                instructor.getName(),
                                instructor.getEmail(),
                                instructor.getDescription(),
                                instructor.getDesignation(),
                                instructor.getQualification());
        }
}
