package com.itbd.application.dto.user.person;

import java.time.LocalDateTime;

import com.itbd.application.dao.user.person.AddressDAO;
import com.itbd.application.dao.user.person.PersonDAO;

import dev.hilla.Nullable;
import jakarta.validation.constraints.NotBlank;

public record PersonDTO(
            Long id,
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
                        new AddressDAO(),
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

            personDAO.setCreatedAt(personDTO.createdAt());
            personDAO.setUpdatedAt(personDTO.updatedAt());
      }
}
