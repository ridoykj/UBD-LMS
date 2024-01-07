package com.itbd.application.dto.user;

import java.util.List;

import com.itbd.application.dao.org.edu.ReservationDAO;
import com.itbd.application.dao.user.InstructorDAO;
import com.itbd.application.dao.user.person.PersonDAO;

public record InstructorDTO(
        Long id,
        String name,
        String email,
        String description,
        String designation,
        String qualification,
        List<ReservationDAO> reservations,
        PersonDAO personKey) {
    public static InstructorDTO fromEntity(InstructorDAO instructor) {
        return new InstructorDTO(
                instructor.getId(),
                instructor.getName(),
                instructor.getEmail(),
                instructor.getDescription(),
                instructor.getDesignation(),
                instructor.getQualification(),
                instructor.getReservations(),
                instructor.getPersonKey());
    }

    public static void fromDTO(InstructorDTO instructorDTO, InstructorDAO instructorDAO) {
        instructorDAO.setId(instructorDTO.id());
        instructorDAO.setName(instructorDTO.name());
        instructorDAO.setEmail(instructorDTO.email());
        instructorDAO.setDescription(instructorDTO.description());
        instructorDAO.setDesignation(instructorDTO.designation());
        instructorDAO.setQualification(instructorDTO.qualification());
        instructorDAO.setReservations(instructorDTO.reservations());
        instructorDAO.setPersonKey(instructorDTO.personKey());
    }
}
