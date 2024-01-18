package com.itbd.application.dto.org.place;

import com.itbd.application.dao.org.place.BuildingDAO;
import com.itbd.application.dao.org.place.FloorDAO;

public record FloorDTO(
        Long id,
        String name,
        String alternateName,
        String description,
        String contact,
        Integer floorLevel,
        String floorColor,
        String floorColorCode,
        Integer totalBlocks,
        BuildingDAO building
) {
    public static FloorDTO fromEntity(FloorDAO floor) {
        BuildingDAO building = floor.getBuilding();
        building.setSector(null);
        building.setFloors(null);
        floor.setBuilding(building);
        return new FloorDTO(
                floor.getId(),
                floor.getName(),
                floor.getAlternateName(),
                floor.getDescription(),
                floor.getContact(),
                floor.getFloorLevel(),
                floor.getFloorColor(),
                floor.getFloorColorCode(),
                floor.getTotalBlocks(),
                floor.getBuilding()
        );
    }

    public static void fromDTO(FloorDTO value, FloorDAO floorDAO) {
        floorDAO.setId(value.id());
        floorDAO.setName(value.name());
        floorDAO.setAlternateName(value.alternateName());
        floorDAO.setDescription(value.description());
        floorDAO.setContact(value.contact());
        floorDAO.setFloorLevel(value.floorLevel());
        floorDAO.setFloorColor(value.floorColor());
        floorDAO.setFloorColorCode(value.floorColorCode());
        floorDAO.setTotalBlocks(value.totalBlocks());
        floorDAO.setBuilding(value.building());
    }
}
