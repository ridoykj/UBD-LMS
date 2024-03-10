package com.itbd.application.dto.user.person;

import com.itbd.application.dao.user.person.ContactDao;
import org.springframework.data.annotation.Version;

public record ContactDto(
        Long id,
        @Version Long version,
        String email,
        String mobile,
        String telephone,
        String faxNumber) {
    public static ContactDto fromEntity(ContactDao contact) {
        return new ContactDto(
                contact.getId(),
                contact.getVersion(),
                contact.getEmail(),
                contact.getMobile(),
                contact.getTelephone(),
                contact.getFaxNumber());
    }

    public static void fromDTO(ContactDto contactDTO, ContactDao contactDAO) {
        contactDAO.setId(contactDTO.id());
        contactDAO.setVersion(contactDTO.version());
        contactDAO.setEmail(contactDTO.email());
        contactDAO.setMobile(contactDTO.mobile());
        contactDAO.setTelephone(contactDTO.telephone());
        contactDAO.setFaxNumber(contactDTO.faxNumber());
    }
}
