package com.itbd.application.dto.org.place;

import com.itbd.application.dao.org.place.SectorDAO;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.annotation.Version;

public record SectorDTO(
        Long id,
        @Version Long version,
        @NotNull @NotEmpty String name,
        String alternateName,
        String city,
        String state,
        String country,
        String contact,
        String description) {
    public static SectorDTO fromEntity(SectorDAO sector) {
        sector.setBuildings(null);
        return new SectorDTO(
                sector.getId(),
                sector.getVersion(),
                sector.getName(),
                sector.getAlternateName(),
                sector.getCity(),
                sector.getState(),
                sector.getCountry(),
                sector.getContact(),
                sector.getDescription());
    }

    public static void fromDTO(SectorDTO sectorDTO, SectorDAO sectorDAO) {
        sectorDAO.setId(sectorDTO.id());
        sectorDAO.setVersion(sectorDTO.version());
        sectorDAO.setName(sectorDTO.name());
        sectorDAO.setAlternateName(sectorDTO.alternateName());
        sectorDAO.setCity(sectorDTO.city());
        sectorDAO.setState(sectorDTO.state());
        sectorDAO.setCountry(sectorDTO.country());
        sectorDAO.setContact(sectorDTO.contact());
        sectorDAO.setDescription(sectorDTO.description());
    }
}
