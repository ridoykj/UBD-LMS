package com.itbd.application.dto.user.student;

import com.itbd.application.dao.org.edu.BatchDAO;
import com.itbd.application.dao.user.StudentDAO;
import com.itbd.application.dao.user.person.PersonDAO;

public record StudentDTO(
                Long id,
                String name,
                String smsReceiveNo,
                String emailReceive,
                String guardian,
                String guardianPhone,
                String status,
                BatchDAO batch,
                PersonDAO personKey) {

        public static StudentDTO fromEntity(StudentDAO testimonial) {
                return new StudentDTO(
                                testimonial.getId(),
                                testimonial.getName(),
                                testimonial.getSmsReceiveNo(),
                                testimonial.getEmailReceive(),
                                testimonial.getGuardian(),
                                testimonial.getGuardianPhone(),
                                testimonial.getStatus(),
                                testimonial.getBatch(),
                                testimonial.getPersonKey());
        }

        public static void fromDTO(StudentDTO studentDTO, StudentDAO studentDAO) {
                studentDAO.setId(studentDTO.id());
                studentDAO.setName(studentDTO.name());
                studentDAO.setSmsReceiveNo(studentDTO.smsReceiveNo());
                studentDAO.setEmailReceive(studentDTO.emailReceive());
                studentDAO.setGuardian(studentDTO.guardian());
                studentDAO.setGuardianPhone(studentDTO.guardianPhone());
                studentDAO.setStatus(studentDTO.status());
                studentDAO.setBatch(studentDTO.batch());
                studentDAO.setPersonKey(studentDTO.personKey());
        }
}
