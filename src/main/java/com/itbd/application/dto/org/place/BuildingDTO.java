package com.itbd.application.dto.org.place;

import com.itbd.application.constants.enums.BuildingTypeEnum;
import com.itbd.application.dao.org.place.BuildingDao;
import com.itbd.application.dao.org.place.FloorDao;
import com.itbd.application.dao.org.place.SectorDao;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.annotation.Version;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

public record BuildingDto(
        Long id,
        @Version Long version,
        @NotNull @NotEmpty String name,
        BuildingTypeEnum type,
        String block,
        String alternateName,
        LocalDateTime openingDate,
        LocalDateTime closingDate,
        LocalTime openingTime,
        LocalTime closingTime,
        String contact,
        String buildingColor,
        String buildingColorCode,
        String pincode,
        List<FloorDao> floors,
        SectorDao sector) {

    public static BuildingDto fromEntity(BuildingDao building) {
        SectorDao sector = building.getSector();
        sector.setBuildings(null);
        building.setSector(sector);
        building.setFloors(null);

        return new BuildingDto(
                building.getId(),
                building.getVersion(),
                building.getName(),
                building.getType(),
                building.getBlock(),
                building.getAlternateName(),

                building.getOpeningDate(),
                building.getClosingDate(),
                building.getOpeningTime(),
                building.getClosingTime(),

                building.getContact(),
                building.getBuildingColor(),
                building.getBuildingColorCode(),
                building.getPincode(),
                building.getFloors(),
                building.getSector());
    }

    public static void fromDTO(BuildingDto buildingDTO, BuildingDao buildingDAO) {
        buildingDAO.setId(buildingDTO.id());
        buildingDAO.setVersion(buildingDTO.version());
        buildingDAO.setName(buildingDTO.name());
        buildingDAO.setType(buildingDTO.type());
        buildingDAO.setBlock(buildingDTO.block());
        buildingDAO.setAlternateName(buildingDTO.alternateName());

        buildingDAO.setOpeningDate(buildingDTO.openingDate());
        buildingDAO.setClosingDate(buildingDTO.closingDate());
        buildingDAO.setOpeningTime(buildingDTO.openingTime());
        buildingDAO.setClosingTime(buildingDTO.closingTime());

        buildingDAO.setContact(buildingDTO.contact());
        buildingDAO.setBuildingColor(buildingDTO.buildingColor());
        buildingDAO.setBuildingColorCode(buildingDTO.buildingColorCode());
        buildingDAO.setPincode(buildingDTO.pincode());
        buildingDAO.setFloors(buildingDTO.floors());
        buildingDAO.setSector(buildingDTO.sector());
    }
}