package com.itbd.application.dto.user.person;

import com.itbd.application.dao.user.person.ContactDAO;
import org.springframework.data.annotation.Version;

public record ContactDTO(
        Long id,
        @Version Long version,
        String email,
        String mobile,
        String telephone,
        String faxNumber) {
    public static ContactDTO fromEntity(ContactDAO contact) {
        return new ContactDTO(
                contact.getId(),
                contact.getVersion(),
                contact.getEmail(),
                contact.getMobile(),
                contact.getTelephone(),
                contact.getFaxNumber());
    }

    public static void fromDTO(ContactDTO contactDTO, ContactDAO contactDAO) {
        contactDAO.setId(contactDTO.id());
        contactDAO.setVersion(contactDTO.version());
        contactDAO.setEmail(contactDTO.email());
        contactDAO.setMobile(contactDTO.mobile());
        contactDAO.setTelephone(contactDTO.telephone());
        contactDAO.setFaxNumber(contactDTO.faxNumber());
    }
}
