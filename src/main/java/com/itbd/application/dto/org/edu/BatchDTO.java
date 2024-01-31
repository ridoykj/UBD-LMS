package com.itbd.application.dto.org.edu;

import com.itbd.application.dao.org.allocation.BatchCourseDAO;
import com.itbd.application.dao.org.edu.BatchDAO;
import com.itbd.application.dao.org.edu.ProgrammeDAO;
import com.itbd.application.dao.org.edu.ReservationDAO;
import com.itbd.application.dao.user.StudentDAO;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.annotation.Version;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

public record BatchDTO(
        Long id,
        @Version Long version,
        @NotNull @NotEmpty String name,
        String code,
        String description,
        String status,
        String session,
        LocalDate graduationDate,
        LocalDate startDate,
        LocalDate endDate,
        LocalDateTime admissionStartDate,
        LocalDateTime admissionEndDate,
        Long numberOfStudents,
        Long numberOfLecture,
        Long numberOfTutorial,
        Long numberOfPractical,
        Long numberOfCredits,
        Long numberOfSemester,
        ProgrammeDAO programme,
        Set<ReservationDAO> reservations,
        Set<BatchCourseDAO> batchCourses,
        Set<StudentDAO> students
) {

    public static BatchDTO fromEntity(BatchDAO batch) {
        ProgrammeDAO programme = batch.getProgramme();
        programme.setDepartment(null);
        programme.setBatches(null);

        batch.setProgramme(programme);
        batch.setReservations(null);
        batch.setStudents(null);
        batch.setBatchCourses(null);

        return new BatchDTO(
                batch.getId(),
                batch.getVersion(),
                batch.getName(),
                batch.getCode(),
                batch.getDescription(),
                batch.getStatus(),
                batch.getSession(),
                batch.getGraduationDate(),
                batch.getStartDate(),
                batch.getEndDate(),
                batch.getAdmissionStartDate(),
                batch.getAdmissionEndDate(),
                batch.getNumberOfStudents(),
                batch.getNumberOfLecture(),
                batch.getNumberOfTutorial(),
                batch.getNumberOfPractical(),
                batch.getNumberOfCredits(),
                batch.getNumberOfSemester(),
                batch.getProgramme(),
                batch.getReservations(),
                batch.getBatchCourses(),
                batch.getStudents());
    }

    public static void fromDTO(BatchDTO batchDTO, BatchDAO batchDAO) {
        batchDAO.setId(batchDTO.id());
        batchDAO.setVersion(batchDTO.version());
        batchDAO.setName(batchDTO.name());
        batchDAO.setCode(batchDTO.code());
        batchDAO.setDescription(batchDTO.description());
        batchDAO.setStatus(batchDTO.status());
        batchDAO.setSession(batchDTO.session());
        batchDAO.setGraduationDate(batchDTO.graduationDate());
        batchDAO.setStartDate(batchDTO.startDate());
        batchDAO.setEndDate(batchDTO.endDate());
        batchDAO.setAdmissionStartDate(batchDTO.admissionStartDate());
        batchDAO.setAdmissionEndDate(batchDTO.admissionEndDate());
        batchDAO.setNumberOfStudents(batchDTO.numberOfStudents());
        batchDAO.setNumberOfLecture(batchDTO.numberOfLecture());
        batchDAO.setNumberOfTutorial(batchDTO.numberOfTutorial());
        batchDAO.setNumberOfPractical(batchDTO.numberOfPractical());
        batchDAO.setNumberOfCredits(batchDTO.numberOfCredits());
        batchDAO.setNumberOfSemester(batchDTO.numberOfSemester());
        batchDAO.setProgramme(batchDTO.programme());
        batchDAO.setReservations(batchDTO.reservations());
        batchDAO.setStudents(batchDTO.students());
        batchDAO.setBatchCourses(batchDTO.batchCourses());
    }

}
