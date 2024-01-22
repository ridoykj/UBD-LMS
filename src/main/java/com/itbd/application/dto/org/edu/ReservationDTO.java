package com.itbd.application.dto.org.edu;

import com.itbd.application.dao.org.edu.BatchDAO;
import com.itbd.application.dao.org.edu.CourseDAO;
import com.itbd.application.dao.org.edu.ReservationDAO;
import com.itbd.application.dao.org.place.RoomDAO;
import com.itbd.application.dao.user.InstructorDAO;
import com.itbd.application.dao.user.person.PersonDAO;
import nonapi.io.github.classgraph.json.Id;
import org.springframework.data.annotation.Version;

import java.time.LocalDate;

public record ReservationDTO(
        @Id Long id,
        @Version Long version,
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
        BatchDAO batch,
        RoomDAO room,
        InstructorDAO instructor) {

    public static ReservationDTO fromEntity(ReservationDAO reservation) {
        BatchDAO batch = reservation.getBatch();
        RoomDAO room = reservation.getRoom();
        InstructorDAO instructor = reservation.getInstructor();

        PersonDAO person = instructor.getPerson();
        person.setAddress(null);
        person.setContact(null);
        person.setRecord(null);
        person.setMedical(null);
        person.setOccupation(null);
        person.setInstructor(null);

        batch.setProgramme(null);
        batch.setReservations(null);
        batch.setStudents(null);
        room.setReservations(null);
        room.setFloor(null);
        instructor.setReservations(null);
        instructor.setPerson(person);

        reservation.setBatch(batch);
        reservation.setRoom(room);
        reservation.setInstructor(instructor);

        return new ReservationDTO(
                reservation.getId(),
                reservation.getVersion(),
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
                reservation.getBatch(),
                reservation.getRoom(),
                reservation.getInstructor());
    }

    public static void fromDTO(ReservationDTO reservationDTO, ReservationDAO reservationDAO) {
        reservationDAO.setId(reservationDTO.id());
        reservationDAO.setVersion(reservationDTO.version());
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

        BatchDAO batch = reservationDTO.batch() != null ? reservationDTO.batch() : new BatchDAO();
        RoomDAO room = reservationDTO.room() != null ? reservationDTO.room() : new RoomDAO();
        InstructorDAO instructor = reservationDTO.instructor() != null ? reservationDTO.instructor() : new InstructorDAO();
//        instructor.setPerson(null);

        reservationDAO.setBatch(batch);
        reservationDAO.setRoom(room);
        reservationDAO.setInstructor(instructor);
    }
}
