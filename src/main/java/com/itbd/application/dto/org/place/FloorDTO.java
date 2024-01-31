package com.itbd.application.dto.org.place;

import com.itbd.application.dao.org.place.BuildingDAO;
import com.itbd.application.dao.org.place.FloorDAO;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.annotation.Version;

public record FloorDTO(
        Long id,
        @Version Long version,
        @NotNull @NotEmpty String name,
        String alternateName,
        String description,
        String contact,
        @NotNull(message = "You can't leave this field")  Integer floorLevel,
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
                floor.getVersion(),
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
        floorDAO.setVersion(value.version());
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
