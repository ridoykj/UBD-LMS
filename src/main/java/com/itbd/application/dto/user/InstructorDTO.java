package com.itbd.application.dto.user;

import java.util.List;

import com.itbd.application.dao.org.edu.ReservationDAO;
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
    
}
