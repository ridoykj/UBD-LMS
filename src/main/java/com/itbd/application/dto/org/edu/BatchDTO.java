package com.itbd.application.dto.org.edu;

import com.itbd.application.dao.org.allocation.BatchCourseDao;
import com.itbd.application.dao.org.edu.BatchDao;
import com.itbd.application.dao.org.edu.ProgrammeDao;
import com.itbd.application.dao.org.edu.ReservationDao;
import com.itbd.application.dao.user.StudentDao;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.annotation.Version;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

public record BatchDto(
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
        ProgrammeDao programme,
        Set<ReservationDao> reservations,
        Set<BatchCourseDao> batchCourses,
        Set<StudentDao> students
) {

    public static BatchDto fromEntity(BatchDao batch) {
        ProgrammeDao programme = batch.getProgramme();
        programme.setDepartment(null);
        programme.setBatches(null);

        batch.setProgramme(programme);
        batch.setReservations(null);
        batch.setStudents(null);
        batch.setBatchCourses(null);

        return new BatchDto(
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

    public static void fromDTO(BatchDto batchDTO, BatchDao batchDAO) {
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
