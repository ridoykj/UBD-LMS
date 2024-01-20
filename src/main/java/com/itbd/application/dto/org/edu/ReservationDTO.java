package com.itbd.application.dto.org.edu;

import com.itbd.application.constants.ClassTypeEnum;
import com.itbd.application.dao.org.edu.BatchDAO;
import com.itbd.application.dao.org.edu.CourseDAO;
import com.itbd.application.dao.org.edu.ReservationDAO;
import com.itbd.application.dao.org.place.RoomDAO;
import com.itbd.application.dao.user.InstructorDAO;
import nonapi.io.github.classgraph.json.Id;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

public record ReservationDTO(
        @Id Long id,
        String name,
        String code,
        String type,
        String description,
        String status,
        String group,
        Long section,
        Long semester,
        Long shift,
        LocalDate startDate,
        LocalDate endDate,
        Long duration,
        CourseDAO course,
        BatchDAO batch,
        RoomDAO room,
        InstructorDAO instructor) {

    public static ReservationDTO fromEntity(ReservationDAO reservation) {

        return new ReservationDTO(
                reservation.getId(),
                reservation.getName(),
                reservation.getCode(),
                reservation.getType(),
                reservation.getDescription(),
                reservation.getStatus(),
                reservation.getGroup(),
                reservation.getSection(),
                reservation.getSemester(),
                reservation.getShift(),
                reservation.getStartDate(),
                reservation.getEndDate(),
                reservation.getDuration(),
                reservation.getCourse(),
                reservation.getBatch(),
                reservation.getRoom(),
                reservation.getInstructor());
    }

    public static void fromDTO(ReservationDTO reservationDTO, ReservationDAO reservationDAO) {
        reservationDAO.setId(reservationDTO.id());
        reservationDAO.setName(reservationDTO.name());
        reservationDAO.setCode(reservationDTO.code());
        reservationDAO.setType(reservationDTO.type());
        reservationDAO.setDescription(reservationDTO.description());
        reservationDAO.setStatus(reservationDTO.status());
        reservationDAO.setGroup(reservationDTO.group());
        reservationDAO.setSection(reservationDTO.section());
        reservationDAO.setSemester(reservationDTO.semester());
        reservationDAO.setShift(reservationDTO.shift());
        reservationDAO.setStartDate(reservationDTO.startDate());
        reservationDAO.setEndDate(reservationDTO.endDate());
        reservationDAO.setDuration(reservationDTO.duration());
        reservationDAO.setCourse(reservationDTO.course());
        reservationDAO.setBatch(reservationDTO.batch());
        reservationDAO.setRoom(reservationDTO.room());
        reservationDAO.setInstructor(reservationDTO.instructor());
    }
}
