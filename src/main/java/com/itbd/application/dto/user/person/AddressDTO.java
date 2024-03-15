package com.itbd.application.dto.user.person;

import com.itbd.application.dao.user.person.AddressDao;
import org.springframework.data.annotation.Version;

import java.time.LocalDateTime;

public record AddressDto(
        Long id,
        @Version Long version,
        String birthPlace,
        String deathPlace,
        String homeLocation,
        String presentAddress,
        String permanentAddress,
        LocalDateTime createdAt,
        LocalDateTime updatedAt) {
    public static AddressDto fromEntity(AddressDao address) {
        return new AddressDto(
                address.getId(),
                address.getVersion(),
                address.getBirthPlace(),
                address.getDeathPlace(),
                address.getHomeLocation(),
                address.getPresentAddress(),
                address.getPermanentAddress(),
                address.getCreatedAt(),
                address.getUpdatedAt());
    }

    public static void fromDTO(AddressDto addressDTO, AddressDao addressDAO) {
        addressDAO.setId(addressDTO.id());
        addressDAO.setVersion(addressDTO.version());
        addressDAO.setBirthPlace(addressDTO.birthPlace());
        addressDAO.setDeathPlace(addressDTO.deathPlace());
        addressDAO.setHomeLocation(addressDTO.homeLocation());
        addressDAO.setPresentAddress(addressDTO.presentAddress());
        addressDAO.setPermanentAddress(addressDTO.permanentAddress());
    }
}