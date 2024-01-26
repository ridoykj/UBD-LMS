package com.itbd.application.dto.org.allocation;

import com.itbd.application.constants.DayTypeEnum;
import com.itbd.application.dao.org.allocation.BatchCourseDAO;
import com.itbd.application.dao.org.allocation.BatchRoomDAO;
import com.itbd.application.dao.org.place.RoomDAO;
import org.springframework.data.annotation.Version;

import java.time.LocalDate;
import java.time.LocalTime;

public record BatchRoomDTO(
        Long id,
        @Version Long version,
        DayTypeEnum dayName,
        LocalDate startDate,
        LocalDate endDate,
        LocalTime startTime,
        LocalTime endTime,
        String description,
        BatchCourseDAO batchCourse,
        RoomDAO room
) {


    public static BatchRoomDTO fromEntity(BatchRoomDAO batchRoom) {

        return new BatchRoomDTO(
                batchRoom.getId(),
                batchRoom.getVersion(),
                batchRoom.getDayName(),
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
        batchRoom.setStartDate(value.startDate());
        batchRoom.setEndDate(value.endDate());
        batchRoom.setStartTime(value.startTime());
        batchRoom.setEndTime(value.endTime());
        batchRoom.setDescription(value.description());
        batchRoom.setBatchCourse(value.batchCourse());
        batchRoom.setRoom(value.room());
    }
}
