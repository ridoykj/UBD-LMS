package com.itbd.application.dto.user.student;

import com.itbd.application.dao.org.edu.BatchDao;
import com.itbd.application.dao.user.StudentDao;
import com.itbd.application.dao.user.person.PersonDao;
import org.springframework.data.annotation.Version;

public record StudentDto(
        Long id,
        @Version Long version,
        String name,
        String smsReceiveNo,
        String emailReceive,
        String guardian,
        String guardianPhone,
        String status,
        BatchDao batch,
        PersonDao personKey) {

    public static StudentDto fromEntity(StudentDao testimonial) {
        return new StudentDto(
                testimonial.getId(),
                testimonial.getVersion(),
                testimonial.getName(),
                testimonial.getSmsReceiveNo(),
                testimonial.getEmailReceive(),
                testimonial.getGuardian(),
                testimonial.getGuardianPhone(),
                testimonial.getStatus(),
                testimonial.getBatch(),
                testimonial.getPerson());
    }

    public static void fromDTO(StudentDto studentDTO, StudentDao studentDAO) {
        studentDAO.setId(studentDTO.id());
        studentDAO.setVersion(studentDTO.version());
        studentDAO.setName(studentDTO.name());
        studentDAO.setSmsReceiveNo(studentDTO.smsReceiveNo());
        studentDAO.setEmailReceive(studentDTO.emailReceive());
        studentDAO.setGuardian(studentDTO.guardian());
        studentDAO.setGuardianPhone(studentDTO.guardianPhone());
        studentDAO.setStatus(studentDTO.status());
        studentDAO.setBatch(studentDTO.batch());
        studentDAO.setPerson(studentDTO.personKey());
    }
}
