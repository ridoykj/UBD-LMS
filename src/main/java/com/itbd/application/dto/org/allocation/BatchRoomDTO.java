package com.itbd.application.dto.org.allocation;

import com.itbd.application.constants.enums.DayTypeEnum;
import com.itbd.application.constants.enums.EventTypeEnum;
import com.itbd.application.dao.org.allocation.BatchCourseDao;
import com.itbd.application.dao.org.allocation.BatchRoomDao;
import com.itbd.application.dao.org.place.BuildingDao;
import com.itbd.application.dao.org.place.FloorDao;
import com.itbd.application.dao.org.place.RoomDao;
import com.itbd.application.dao.org.place.SectorDao;
import jakarta.persistence.Id;
import jakarta.persistence.Version;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalTime;

public record BatchRoomDto(
        @Id Long id,
        @Version Long version,
        DayTypeEnum dayName,
        EventTypeEnum eventType,
        LocalDate startDate,
        LocalDate endDate,
        LocalTime startTime,
        LocalTime endTime,
        String description,
        @NotNull BatchCourseDao batchCourse,
        @NotNull RoomDao room
) {


    public static BatchRoomDto fromEntity(BatchRoomDao batchRoom) {
        RoomDao room = batchRoom.getRoom();
        room.setReservations(null);
        FloorDao floor = room.getFloor();
        floor.setRooms(null);
        BuildingDao building = floor.getBuilding() != null ? floor.getBuilding() : new BuildingDao();
        building.setFloors(null);
        SectorDao sector = building.getSector() != null ? building.getSector() : new SectorDao();
        sector.setBuildings(null);

        building.setSector(sector);
        floor.setBuilding(building);
        room.setFloor(floor);
        room.setBatchRooms(null);

        batchRoom.setRoom(room);
        return new BatchRoomDto(
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

    public static void fromDTO(BatchRoomDto value, BatchRoomDao batchRoom) {
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
