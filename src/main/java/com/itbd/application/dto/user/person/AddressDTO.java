package com.itbd.application.dto.user.person;

import java.time.LocalDateTime;

import com.itbd.application.dao.user.person.AddressDAO;

public record AddressDTO(
        Long id,
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
            addressDAO.setBirthPlace(addressDTO.birthPlace());
            addressDAO.setDeathPlace(addressDTO.deathPlace());
            addressDAO.setHomeLocation(addressDTO.homeLocation());
            addressDAO.setPresentAddress(addressDTO.presentAddress());
            addressDAO.setPermanentAddress(addressDTO.permanentAddress());
            addressDAO.setCreatedAt(addressDTO.createdAt());
            addressDAO.setUpdatedAt(addressDTO.updatedAt());
      }
}