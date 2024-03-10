package com.itbd.application.dto.org.edu;

import com.itbd.application.dao.org.edu.BatchDao;
import com.itbd.application.dao.org.edu.ReservationDao;
import com.itbd.application.dao.org.place.RoomDao;
import com.itbd.application.dao.user.InstructorDao;
import com.itbd.application.dao.user.person.PersonDao;
import nonapi.io.github.classgraph.json.Id;
import org.springframework.data.annotation.Version;

import java.time.LocalDate;

public record ReservationDto(
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
        BatchDao batch,
        RoomDao room,
        InstructorDao instructor) {

    public static ReservationDto fromEntity(ReservationDao reservation) {
        BatchDao batch = reservation.getBatch();
        RoomDao room = reservation.getRoom();
        InstructorDao instructor = reservation.getInstructor();

        PersonDao person = instructor.getPerson();
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

        return new ReservationDto(
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

    public static void fromDTO(ReservationDto reservationDTO, ReservationDao reservationDAO) {
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

        BatchDao batch = reservationDTO.batch() != null ? reservationDTO.batch() : new BatchDao();
        RoomDao room = reservationDTO.room() != null ? reservationDTO.room() : new RoomDao();
        InstructorDao instructor = reservationDTO.instructor() != null ? reservationDTO.instructor() : new InstructorDao();

        reservationDAO.setBatch(batch);
        reservationDAO.setRoom(room);
        reservationDAO.setInstructor(instructor);
    }
}
