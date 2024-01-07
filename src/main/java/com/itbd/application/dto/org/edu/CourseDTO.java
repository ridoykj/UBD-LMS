package com.itbd.application.dto.org.edu;

import java.math.BigDecimal;
import java.util.List;

import com.itbd.application.dao.org.edu.CourseDAO;
import com.itbd.application.dao.org.edu.ProgrammeDAO;
import com.itbd.application.dao.org.edu.ReservationDAO;

public record CourseDTO(
                Long id,
                String name,
                String code,
                String prerequisites,
                BigDecimal numberOfCredits,
                String headline,
                String about,
                BigDecimal numberOfStudents,
                BigDecimal numberOfLecture,
                BigDecimal numberOfTutorial,
                String type,
                String level,
                String language,
                String category,
                String subCategory,
                BigDecimal duration,
                String durationUnit,
                List<ReservationDAO> reservations,
                ProgrammeDAO programme) {

        public static CourseDTO fromEntity(CourseDAO course) {
                return new CourseDTO(
                                course.getId(),
                                course.getName(),
                                course.getCode(),
                                course.getPrerequisites(),
                                course.getNumberOfCredits(),
                                course.getHeadline(),
                                course.getAbout(),
                                course.getNumberOfStudents(),
                                course.getNumberOfLecture(),
                                course.getNumberOfTutorial(),
                                course.getType(),
                                course.getLevel(),
                                course.getLanguage(),
                                course.getCategory(),
                                course.getSubCategory(),
                                course.getDuration(),
                                course.getDurationUnit(),
                                course.getReservations(),
                                course.getProgramme());
        }

        public static void fromDTO(CourseDTO courseDTO, CourseDAO courseDAO) {
                courseDAO.setId(courseDTO.id());
                courseDAO.setName(courseDTO.name());
                courseDAO.setCode(courseDTO.code());
                courseDAO.setPrerequisites(courseDTO.prerequisites());
                courseDAO.setNumberOfCredits(courseDTO.numberOfCredits());
                courseDAO.setHeadline(courseDTO.headline());
                courseDAO.setAbout(courseDTO.about());
                courseDAO.setNumberOfStudents(courseDTO.numberOfStudents());
                courseDAO.setNumberOfLecture(courseDTO.numberOfLecture());
                courseDAO.setNumberOfTutorial(courseDTO.numberOfTutorial());
                courseDAO.setType(courseDTO.type());
                courseDAO.setLevel(courseDTO.level());
                courseDAO.setLanguage(courseDTO.language());
                courseDAO.setCategory(courseDTO.category());
                courseDAO.setSubCategory(courseDTO.subCategory());
                courseDAO.setDuration(courseDTO.duration());
                courseDAO.setDurationUnit(courseDTO.durationUnit());
                courseDAO.setReservations(courseDTO.reservations());
                courseDAO.setProgramme(courseDTO.programme());
        }

}
