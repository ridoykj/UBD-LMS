package com.itbd.application.dto.org.place;

import com.itbd.application.constants.RoomTypeEnum;
import com.itbd.application.dao.org.place.BuildingDAO;
import com.itbd.application.dao.org.place.FloorDAO;
import com.itbd.application.dao.org.place.RoomDAO;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.annotation.Version;

public record RoomDTO(
        Long id,
        @Version Long version,
        @NotNull @NotEmpty String name,
        String alternateName,
        RoomTypeEnum type,
        String description,
        String contact,
        Boolean hasPublicAccess,
        Integer totalRooms,
        String block,
        Integer totalBeds,
        FloorDAO floor) {
    public static RoomDTO fromEntity(RoomDAO room) {
        FloorDAO floor = room.getFloor();
        BuildingDAO building = floor.getBuilding();
        building.setFloors(null);
        building.setSector(null);

        floor.setBuilding(building);
        floor.setRooms(null);
        room.setFloor(floor);
        return new RoomDTO(
                room.getId(),
                room.getVersion(),
                room.getName(),
                room.getAlternateName(),
                room.getType(),
                room.getDescription(),
                room.getContact(),
                room.getHasPublicAccess(),
                room.getTotalRooms(),
                room.getBlock(),
                room.getTotalBeds(),
                room.getFloor());
    }

    public static void fromDTO(RoomDTO roomDTO, RoomDAO roomDAO) {
        roomDAO.setId(roomDTO.id());
        roomDAO.setVersion(roomDTO.version());
        roomDAO.setName(roomDTO.name());
        roomDAO.setAlternateName(roomDTO.alternateName());
        roomDAO.setType(roomDTO.type());
        roomDAO.setDescription(roomDTO.description());
        roomDAO.setContact(roomDTO.contact());
        roomDAO.setHasPublicAccess(roomDTO.hasPublicAccess());
        roomDAO.setTotalRooms(roomDTO.totalRooms());
        roomDAO.setBlock(roomDTO.block());
        roomDAO.setTotalBeds(roomDTO.totalBeds());
        roomDAO.setFloor(roomDTO.floor());
    }
}
