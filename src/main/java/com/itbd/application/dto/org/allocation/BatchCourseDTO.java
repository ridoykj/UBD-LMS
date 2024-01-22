package com.itbd.application.dto.org.allocation;

import com.itbd.application.dao.org.allocation.BatchCourseDAO;
import com.itbd.application.dao.org.edu.BatchDAO;
import com.itbd.application.dao.org.edu.CourseDAO;
import com.itbd.application.dao.org.place.RoomDAO;
import com.itbd.application.dao.user.InstructorDAO;
import com.itbd.application.dto.org.edu.CourseDTO;
import org.springframework.data.annotation.Version;

import java.math.BigDecimal;

public record BatchCourseDTO(
        Long id,
        @Version Long version,
        String name,
        String code,
        String prerequisites,
        String headline,
        Long semester,
        String about,
        BigDecimal numberOfCredits,
        BigDecimal numberOfLecture,
        BigDecimal numberOfTutorial,
        String type,
        BigDecimal duration,
        String durationUnit,
        CourseDAO course,
        BatchDAO batch
) {


    public static BatchCourseDTO fromEntity(BatchCourseDAO batchCourse) {

        return new BatchCourseDTO(
                batchCourse.getId(),
                batchCourse.getVersion(),
                batchCourse.getName(),
                batchCourse.getCode(),
                batchCourse.getPrerequisites(),
                batchCourse.getHeadline(),
                batchCourse.getSemester(),
                batchCourse.getAbout(),
                batchCourse.getNumberOfCredits(),
                batchCourse.getNumberOfLecture(),
                batchCourse.getNumberOfTutorial(),
                batchCourse.getType(),
                batchCourse.getDuration(),
                batchCourse.getDurationUnit(),
                batchCourse.getCourse(),
                batchCourse.getBatch()
        );
    }

    public static void fromDTO(BatchCourseDTO courseDTO, BatchCourseDAO courseDAO) {
        courseDAO.setId(courseDTO.id());
        courseDAO.setVersion(courseDTO.version());
        courseDAO.setName(courseDTO.name());
        courseDAO.setCode(courseDTO.code());
        courseDAO.setPrerequisites(courseDTO.prerequisites());
        courseDAO.setHeadline(courseDTO.headline());
        courseDAO.setSemester(courseDTO.semester());
        courseDAO.setAbout(courseDTO.about());
        courseDAO.setNumberOfCredits(courseDTO.numberOfCredits());
        courseDAO.setNumberOfLecture(courseDTO.numberOfLecture());
        courseDAO.setNumberOfTutorial(courseDTO.numberOfTutorial());
        courseDAO.setType(courseDTO.type());
        courseDAO.setDuration(courseDTO.duration());
        courseDAO.setDurationUnit(courseDTO.durationUnit());

        BatchDAO batch = courseDTO.batch() != null ? courseDTO.batch() : new BatchDAO();
        CourseDAO course = courseDTO.course() != null ? courseDTO.course() : new CourseDAO();

        courseDAO.setBatch(batch);
        courseDAO.setCourse(course);
    }

}
