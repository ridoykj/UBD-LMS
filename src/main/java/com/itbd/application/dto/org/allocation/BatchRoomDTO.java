package com.itbd.application.dto.org.allocation;

import com.itbd.application.constants.enums.DayTypeEnum;
import com.itbd.application.constants.enums.EventTypeEnum;
import com.itbd.application.dao.org.allocation.BatchCourseDAO;
import com.itbd.application.dao.org.allocation.BatchRoomDAO;
import com.itbd.application.dao.org.place.BuildingDAO;
import com.itbd.application.dao.org.place.FloorDAO;
import com.itbd.application.dao.org.place.RoomDAO;
import com.itbd.application.dao.org.place.SectorDAO;
import jakarta.persistence.Id;
import jakarta.persistence.Version;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalTime;

public record BatchRoomDTO(
        @Id Long id,
        @Version Long version,
        DayTypeEnum dayName,
        EventTypeEnum eventType,
        LocalDate startDate,
        LocalDate endDate,
        LocalTime startTime,
        LocalTime endTime,
        String description,
        @NotNull BatchCourseDAO batchCourse,
        @NotNull RoomDAO room
) {


    public static BatchRoomDTO fromEntity(BatchRoomDAO batchRoom) {
        RoomDAO room = batchRoom.getRoom();
        room.setReservations(null);
        FloorDAO floor = room.getFloor();
        floor.setRooms(null);
        BuildingDAO building = floor.getBuilding() != null ? floor.getBuilding() : new BuildingDAO();
        building.setFloors(null);
        SectorDAO sector = building.getSector() != null ? building.getSector() : new SectorDAO();
        sector.setBuildings(null);

        building.setSector(sector);
        floor.setBuilding(building);
        room.setFloor(floor);
        room.setBatchRooms(null);

        batchRoom.setRoom(room);
        return new BatchRoomDTO(
                batchRoom.getId(),
                batchRoom.getVersion(),
                batchRoom.getDayName(),
                batchRoom.getEventType(),
                batchRoom.getStartDate(),
                batchRoom.getEndDate(),
                batchRoom.getStartTime(),
                batchRoom.getEndTime(),
                batchRoom.getDescription(),
                batchRoom.getBatchCourse(),
                batchRoom.getRoom()
        );
    }

    public static void fromDTO(BatchRoomDTO value, BatchRoomDAO batchRoom) {
        batchRoom.setId(value.id());
        batchRoom.setVersion(value.version());
        batchRoom.setDayName(value.dayName());
        batchRoom.setEventType(value.eventType());
        batchRoom.setStartDate(value.startDate());
        batchRoom.setEndDate(value.endDate());
        batchRoom.setStartTime(value.startTime());
        batchRoom.setEndTime(value.endTime());
        batchRoom.setDescription(value.description());
        batchRoom.setBatchCourse(value.batchCourse());
        batchRoom.setRoom(value.room());
    }
}
