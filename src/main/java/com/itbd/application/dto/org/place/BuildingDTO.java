package com.itbd.application.dto.org.place;

import java.time.LocalDateTime;
import java.util.List;

import com.itbd.application.constants.BuildingTypeEnum;
import com.itbd.application.dao.org.place.BuildingDAO;
import com.itbd.application.dao.org.place.FloorDAO;
import com.itbd.application.dao.org.place.SectorDAO;

public record BuildingDTO(
        Long id,
        String name,
        BuildingTypeEnum type,
        String block,
        String alternateName,
        LocalDateTime openingTime,
        LocalDateTime closingTime,
        String contact,
        String buildingColor,
        String buildingColorCode,
        String pincode,
        List<FloorDAO> floors,
        SectorDAO sector) {

    public static BuildingDTO fromEntity(BuildingDAO building) {
        return new BuildingDTO(
                building.getId(),
                building.getName(),
                building.getType(),
                building.getBlock(),
                building.getAlternateName(),
                building.getOpeningTime(),
                building.getClosingTime(),
                building.getContact(),
                building.getBuildingColor(),
                building.getBuildingColorCode(),
                building.getPincode(),
                building.getFloors(),
                building.getSector());
    }

    public static void fromDTO(BuildingDTO buildingDTO, BuildingDAO buildingDAO) {
        buildingDAO.setId(buildingDTO.id());
        buildingDAO.setName(buildingDTO.name());
        buildingDAO.setType(buildingDTO.type());
        buildingDAO.setBlock(buildingDTO.block());
        buildingDAO.setAlternateName(buildingDTO.alternateName());
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