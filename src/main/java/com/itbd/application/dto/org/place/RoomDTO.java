package com.itbd.application.dto.org.place;

import com.itbd.application.constants.enums.RoomTypeEnum;
import com.itbd.application.dao.org.place.BuildingDao;
import com.itbd.application.dao.org.place.FloorDao;
import com.itbd.application.dao.org.place.RoomDao;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.annotation.Version;

public record RoomDto(
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
        FloorDao floor) {
    public static RoomDto fromEntity(RoomDao room) {
        FloorDao floor = room.getFloor();
        BuildingDao building = floor.getBuilding();
        building.setFloors(null);
        building.setSector(null);

        floor.setBuilding(building);
        floor.setRooms(null);
        room.setFloor(floor);
        return new RoomDto(
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

    public static void fromDTO(RoomDto roomDTO, RoomDao roomDAO) {
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
