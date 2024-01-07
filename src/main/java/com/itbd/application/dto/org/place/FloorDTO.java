package com.itbd.application.dto.org.place;

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
        Integer totalBlocks) {
    public static FloorDTO fromEntity(FloorDAO floor) {
        return new FloorDTO(
                floor.getId(),
                floor.getName(),
                floor.getAlternateName(),
                floor.getDescription(),
                floor.getContact(),
                floor.getFloorLevel(),
                floor.getFloorColor(),
                floor.getFloorColorCode(),
                floor.getTotalBlocks());
    }

    public static void fromDTO(FloorDTO floorDTO, FloorDAO floorDAO) {
        floorDAO.setId(floorDTO.id());
        floorDAO.setName(floorDTO.name());
        floorDAO.setAlternateName(floorDTO.alternateName());
        floorDAO.setDescription(floorDTO.description());
        floorDAO.setContact(floorDTO.contact());
        floorDAO.setFloorLevel(floorDTO.floorLevel());
        floorDAO.setFloorColor(floorDTO.floorColor());
        floorDAO.setFloorColorCode(floorDTO.floorColorCode());
        floorDAO.setTotalBlocks(floorDTO.totalBlocks());
    }
}
