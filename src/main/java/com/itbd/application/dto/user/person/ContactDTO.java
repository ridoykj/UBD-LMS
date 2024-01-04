package com.itbd.application.dto.user.person;

import com.itbd.application.dao.user.person.ContactDAO;

public record ContactDTO(
            Long id,
            String email,
            String phone,
            String telephone,
            String faxNumber) {
      public static ContactDTO fromEntity(ContactDAO contact) {
            return new ContactDTO(
                        contact.getId(),
                        contact.getEmail(),
                        contact.getPhone(),
                        contact.getTelephone(),
                        contact.getFaxNumber());
      }

      public static void fromDTO(ContactDTO contactDTO, ContactDAO contactDAO) {
            contactDAO.setId(contactDTO.id());
            contactDAO.setEmail(contactDTO.email());
            contactDAO.setPhone(contactDTO.phone());
            contactDAO.setTelephone(contactDTO.telephone());
            contactDAO.setFaxNumber(contactDTO.faxNumber());
      }
}
