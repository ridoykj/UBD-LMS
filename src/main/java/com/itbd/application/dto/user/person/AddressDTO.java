package com.itbd.application.dto.user.person;

import com.itbd.application.dao.user.person.AddressDAO;
import org.springframework.data.annotation.Version;

import java.time.LocalDateTime;

public record AddressDTO(
        Long id,
        @Version Long version,
        String birthPlace,
        String deathPlace,
        String homeLocation,
        String presentAddress,
        String permanentAddress,
        LocalDateTime createdAt,
        LocalDateTime updatedAt) {
    public static AddressDTO fromEntity(AddressDAO address) {
        return new AddressDTO(
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

    public static void fromDTO(AddressDTO addressDTO, AddressDAO addressDAO) {
        addressDAO.setId(addressDTO.id());
        addressDAO.setVersion(addressDTO.version());
        addressDAO.setBirthPlace(addressDTO.birthPlace());
        addressDAO.setDeathPlace(addressDTO.deathPlace());
        addressDAO.setHomeLocation(addressDTO.homeLocation());
        addressDAO.setPresentAddress(addressDTO.presentAddress());
        addressDAO.setPermanentAddress(addressDTO.permanentAddress());
        addressDAO.setCreatedAt(addressDTO.createdAt());
        addressDAO.setUpdatedAt(addressDTO.updatedAt());
    }
}