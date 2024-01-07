package com.itbd.application.dto.org.place;

import com.itbd.application.dao.org.place.RoomDAO;

public record RoomDTO(
        Long id,
        String name,
        String alternateName,
        String description,
        String contact,
        Boolean hasPublicAccess,
        Integer totalRooms,
        String block,
        Integer totalBeds) {
    public static RoomDTO fromEntity(RoomDAO room) {
        return new RoomDTO(
                room.getId(),
                room.getName(),
                room.getAlternateName(),
                room.getDescription(),
                room.getContact(),
                room.getHasPublicAccess(),
                room.getTotalRooms(),
                room.getBlock(),
                room.getTotalBeds());
    }

    public static void fromDTO(RoomDTO roomDTO, RoomDAO roomDAO) {
        roomDAO.setId(roomDTO.id());
        roomDAO.setName(roomDTO.name());
        roomDAO.setAlternateName(roomDTO.alternateName());
        roomDAO.setDescription(roomDTO.description());
        roomDAO.setContact(roomDTO.contact());
        roomDAO.setHasPublicAccess(roomDTO.hasPublicAccess());
        roomDAO.setTotalRooms(roomDTO.totalRooms());
        roomDAO.setBlock(roomDTO.block());
        roomDAO.setTotalBeds(roomDTO.totalBeds());
    }
}
